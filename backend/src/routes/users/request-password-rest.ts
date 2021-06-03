import express, { Response, Request } from "express";
import { User } from "./../../models/user";
import { body } from "express-validator";
import { validateRequest } from "./../../middlewares/validate-request";
import { BadRequestError } from "./../../errors/bad-request-error";
import { randomCode, sendSMS } from "./../../utils/common";
const router = express.Router();

router.post(
  "/api/users/request-password-rest",
  [body("email").trim().isEmail().withMessage("Must be a valid email address")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("User does not exists!!");
    }
    const token = randomCode();
    existingUser.password_changed_at = true;
    existingUser.password_change_token = token;
    await existingUser.save();
    if (existingUser.phone) {
      sendSMS(
        [existingUser.phone.toString()],
        `${token} :is your rest password code `
      );
    } else {
      /**Send to email address */
      console.log("Check your email address, " + token);
    }

    res.send({
      status: "success",
      message:
        "Please check you phone to get the code to use to reset your password",
    });
  }
);

export { router as requestPasswordRest };
