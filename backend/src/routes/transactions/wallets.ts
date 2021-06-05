import { body } from "express-validator";
import { Router, Response, Request } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Transaction, User, UserDoc, Wallet } from "../../models";
import { BadRequestError } from "../../errors/bad-request-error";
const router = Router();

router.get(
  `/api/wallets/currentuser`,
  requireAuth,
  async (req: Request, res: Response) => {
    const wallet = await Wallet.findOne({
      wallet_type: "user",
      user: req.user?.id!,
    });

    res.status(200).json({
      wallet,
      status: "success",
    });
    return;
  }
);

export { router as CurrentUserWalletRoute };
