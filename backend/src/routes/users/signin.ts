import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { validateRequest } from "./../../middlewares/validate-request";
import { BadRequestError } from "./../../errors/bad-request-error";
import { PasswordManager } from "./../../utils/password";
import { Token, User } from "../../models";
import { mpesaPhoneFormat } from "../../utils";

const router = express.Router();
router.post(
  "/api/users/signin",
  [
    body("username").notEmpty().withMessage("Please provide your username"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Please supply your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email: username }, { phone: `+${mpesaPhoneFormat(username)}` }],
    }).select("password");
    if (!existingUser) {
      throw new BadRequestError("Sorry. Invalid email or password");
    }
    const passwordMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("Sorry. Invalid email or password");
    }

    if (existingUser.password_changed) {
      throw new BadRequestError(
        "You recently changed your password. Please login again!!"
      );
    }
    // if (!existingUser.is_active) {
    //   throw new BadRequestError("Please activate your account to continue");
    // }

    // login the user
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        phone: existingUser.phone,
        is_active: existingUser.is_active,
      },
      process.env.JWT_SECRET!
    );

    await Token.create({ token: token });
    res.status(200).json({
      status: "success",
      token,
    });

    return;
  }
);

export { router as signInRouter };
