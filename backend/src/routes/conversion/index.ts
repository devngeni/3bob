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

router.get("/api/currency/current", async (req: Request, res: Response) => {
  const currency = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: 3580.0,
      increase_percentage: "+23%",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: 2703.4,
      increase_percentage: "+31%",
    },
    {
      name: "Solona",
      symbol: "SOL",
      amount: 1200.0,
      increase_percentage: "+2%",
    },
  ];

  res.status(200).json({ currency });
});

export { router as currencyConverterRoute };
