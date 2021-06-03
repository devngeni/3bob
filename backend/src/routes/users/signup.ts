import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "./../../middlewares/validate-request";
import { BadRequestError } from "./../../errors/bad-request-error";
import { User } from "./../../models/user";
import { randomCode, sendSMS } from "./../../utils/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
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
    const { email, password, phone, confirm_password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use");
    }

    if (password !== confirm_password) {
      throw new BadRequestError(`Your password don't match`);
    }

    //password hashing
    const activateCode = randomCode();
    const user = User.build({
      email: email,
      password: password,
      phone: phone,
      activation_code: activateCode,
    });

    await user.save();
    /**
     * Send to User Via SMS
     */
    sendSMS(
      [phone],
      `${process.env.APP_NAME!} actication code is:  ${activateCode}`
    );
    res.status(201).send(user);
  }
);

export { router as signUpRouter };
