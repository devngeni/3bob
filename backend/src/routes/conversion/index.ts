import { body } from "express-validator";
import { Router, Response, Request } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { currencyConverter } from "../../utils";

const router = Router();

router.post(
  "/api/currency/conversion",
  [
    body("amount").notEmpty().withMessage(`please provide amount to convert`),
    body("from_currency")
      .notEmpty()
      .withMessage(`please provide from currency to convert`),
    body("to_currency")
      .notEmpty()
      .withMessage(`please provide to currency to convert`),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { from_currency, to_currency, amount } = req.body;
    const results = await currencyConverter({
      amount,
      from_currency,
      to_currency,
    });
    res.status(200).json(results);
  }
);

export { router as currencyConverterRoute };
