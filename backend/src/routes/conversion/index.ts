import { body } from "express-validator";
import { Router, Response, Request } from "express";
import { validateRequest } from "../../middlewares/validate-request";
import { currencyConverter, getHistoricalData } from "../../utils";
import axios from 'axios'

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


router.get("/api/historical/crypto/data", async(req: Request, res: Response)  => {


  // var markers = [];
  // const items  = ['BTC', 'ETH', 'SOL']
  // for (var i = 0; i < items.length; ++i) {
  //     markers[i] = "some stuff";
  // }

  var history : any = [];

  ['BTC', 'ETH', 'SOL'].forEach(async (element : any) => {
    const hist =  await getHistoricalData({duration_in_months:1 , crypto: element})
    if (element === 'ETH') {
      history.push({
        label: 'ETH',
        data: hist,
        backgroundColor: '#A6917D',
        borderColor: '#A6917D',
        borderWidth: 2,
      })
    } else if (element === 'BTC') {
      history.push({
        label: 'BTC',
        data: hist,
        backgroundColor: '#FAAC94',
        borderColor: '#FAAC94',
        borderWidth: 2,
      })
    }
  })

  console.log(history)

  
  res.status(200).json(history)
})

export { router as currencyConverterRoute };
