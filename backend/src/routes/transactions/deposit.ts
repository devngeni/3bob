import { body } from "express-validator";
import { Router, Response, Request } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Transaction, User, UserDoc, Wallet } from "../../models";
import { BadRequestError } from "../../errors/bad-request-error";
import {
  accountNumber,
  currencyConverter,
  mpesaPhoneFormat,
  sendSMS,
} from "../../utils";
import {
  initiateSTK,
  mpesaApi,
  receiveSTKPushPayloadFromCallbackURL,
} from "../../utils/mpesa";

const router = Router();

router.post(
  "/api/transactions/deposit",
  [
    body("amount").notEmpty().withMessage(`Please provide your phone number`),
    body("phone")
      .notEmpty()
      .withMessage(
        `Please provide amount to deposit to ${process.env.APP_NAME!.toLocaleLowerCase()}`
      ),
  ],
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const user = (await User.findById(req.user?.id)) as UserDoc;

    const wallet = await Wallet.findOne({
      user: user.id,
      wallet_type: "user",
    });

    if (!wallet) {
      throw new BadRequestError(
        `Your wallet account was not found. Please create an account`
      );
    }

    if (!wallet.is_active) {
      throw new BadRequestError(
        `Your ${process.env
          .APP_NAME!} wallet is not active. Please contact ${process.env
          .APP_NAME!}`
      );
    }

    /// get request body details
    const { phone, amount } = req.body;

    const accountNo = accountNumber();
    const phoneNumber = mpesaPhoneFormat(phone);
    const callbackURL = `${process.env.APP_URL}/api/payments/callback-url`;
    const opts = {
      phone: phoneNumber,
      amount: amount,
      callbackURL: callbackURL,
      accountNumber: accountNo,
    };

    console.log(opts);

    const response: any = await initiateSTK(opts);
    let message = "";
    if (response.error) {
      message = response.error;
    } else {
      const transaction = Transaction.build({
        user: user.id,
        transactionId: "",
        phone: response.phone,
        amount: response.amount,
        transaction_type: "deposit",
        status: "pending",
        checkoutId: response.checkoutId,
      });
      await transaction.save();
      console.log(transaction);
      if (!transaction.checkoutId) {
        await Transaction.findByIdAndDelete(transaction.id);
      }
      message = "Please enter your pin in the prompt in your phone";
    }
    res.status(200).json({
      status: "success",
      message,
    });
  }
);

router.post("/api/b2b/timeout-url", async (req: Request, res: Response) => {
  console.log(req.body);
  res.send({});
});

router.post("/api/b2b/timeout-url", async (req: Request, res: Response) => {
  console.log(req.body);
  res.send({});
});

router.post(
  "/api/payments/callback-url",
  async (req: Request, res: Response) => {
    let { transactionId, amount, checkoutId, phone } =
      await receiveSTKPushPayloadFromCallbackURL(req.body);
    const trans = await Transaction.findOne({
      checkoutId,
      phone,
      transactionId: "",
      transaction_type: "deposit",
      status: "pending",
    });

    const results = await currencyConverter({
      amount,
      from_currency: "KES",
      to_currency: "USD",
    });

    amount = results.amount;

    if (trans) {
      const user: any = await User.findById(trans.user);
      // update the user wallet
      if (user) {
        const wallet: any = await Wallet.findOne({
          user: user.id!,
          wallet_type: "user",
        });
        if (wallet) {
          if (trans.transaction_type === "deposit") {
            wallet.amount_in =
              parseFloat(wallet.amount_in) + parseFloat(amount);
            wallet.amount_balance =
              parseFloat(wallet.amount_balance) + parseFloat(amount);
            wallet.save();
            trans.transactionId = transactionId;
            trans.narations = "Successfully made a deposit to wallet";
            trans.status = "success";
            await trans.save();

            let message = `Successfully top up your wallet with KES ${amount} and your new wallet balance is: KES ${wallet.amount_balance}`;

            sendSMS([user.phone], message);
            console.log(
              `Deposit Successful: ${user.name.first} ${user.name.others}  and ${transactionId} with amount of KES ${amount}`
            );
          }
        }
      }
    }

    console.log(
      `Back checkoutID: ${checkoutId}  and ${transactionId} with amount of ${amount}`
    );

    res.status(200).json({
      status: "success",
    });
  }
);

router.post("/api/payments/timeout", async (req: Request, res: Response) => {
  console.log(req.body);

  res.send({});
});

router.get("/api/payments/c2bregister", async (req: Request, res: Response) => {
  const results = await mpesaApi.c2bRegister(
    `${process.env.APP_URL}/api/payments/c2b-callback-url`,
    `${process.env.APP_URL}/api/payments/validation`
  );
  res.status(200).json({
    status: "success",
    results,
  });
});

export { router as DepositTransactionRouter };
