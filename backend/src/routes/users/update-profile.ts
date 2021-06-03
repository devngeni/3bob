import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "./../../middlewares/validate-request";
import { requireAuth } from "./../../middlewares/require-auth";
import { User, UserDoc } from "./../../models/user";

const router = express.Router();

router.patch(
  "/api/users/update-profile",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("phone")
      .trim()
      .notEmpty()
      .withMessage("You must provide phone number"),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const { phone, email, photo } = req.body;
    const id = req.user?.id;
    const existingUser = (await User.findById(id)) as UserDoc;
    if (photo) {
      //save image
    }
    existingUser.email = email;
    existingUser.phone = phone;
    await existingUser.save();
    res.send({
      status: "success",
      user: existingUser,
    });
  }
);

export { router as updateProfile };
