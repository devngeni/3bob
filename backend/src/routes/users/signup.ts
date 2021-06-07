import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "./../../middlewares/validate-request";
import { BadRequestError } from "./../../errors/bad-request-error";
import { User } from "./../../models/user";
import {
  encrypt,
  mpesaPhoneFormat,
  randomCode,
  sendSMS,
} from "./../../utils/common";
import { Wallet } from "../../models";
import { createSolanaAccount } from "../../solana";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("name").notEmpty().withMessage("Please provide your full names"),
    body("email").isEmail().withMessage("Please provide your email address"),
    body("phone").notEmpty().withMessage("Please provide your phone number"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20"),
    body("confirm_password")
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage(
        "You must provide confirma password and match it with password"
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password, phone, confirm_password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });

    if (existingUser) {
      throw new BadRequestError("Email or Phone number already in use");
    }

    if (password !== confirm_password) {
      throw new BadRequestError(`Your password don't match`);
    }

    //password hashing
    const activateCode = randomCode();

    const { address, secretKey } = await createSolanaAccount();

    const user = User.build({
      name: name,
      email: email,
      solana: {
        address,
        secret_key: await encrypt(secretKey),
      },
      password: password,
      phone: `+${mpesaPhoneFormat(phone)}`,
      activation_code: activateCode,
    });

    await user.save();

    if (user) {
      await Wallet.create({
        amount_in: 0.0,
        wallet_type: "user",
        user: user.id,
        amount_balance: 0.0,
        amount_out: 0.0,
      });
    }
    /**
     * Send to User Via SMS
     */

    try {
      await sendSMS(
        [user.phone],
        `${process.env.APP_NAME!} actication code is:  ${activateCode}`
      );
    } catch (error) {
      console.log(error);
    }

    const currentUser = await User.findById(user.id);
    return res.status(201).json(currentUser);

    return;
  }
);

export { router as signUpRouter };
