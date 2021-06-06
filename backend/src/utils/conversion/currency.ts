import axios from "axios";
import { BadRequestError } from "../../errors/bad-request-error";
const { Kraken, Cexio } = require("node-crypto-api");
interface ConvertType {
  from_currency: string;
  amount: number;
  to_currency: string;
}

const currencyConverter = async (opts: ConvertType) => {
  // perform some actions(conversions
  try {
    const url = "https://pro-api.coinmarketcap.com/v1/tools/price-conversion";

    const headers = {
      "X-CMC_PRO_API_KEY": process.env.COINBASE_API_KEY!,
    };

    const qs = {
      amount: opts.amount,
      symbol: opts.from_currency,
      convert: opts.to_currency,
    };

    const { data } = await axios.get(url, { params: qs, headers: headers });
    console.log(data.data);
    return {
      amount: data.data.quote[opts.to_currency].price,
      currency: opts.to_currency,
      more: data.data,
    };
  } catch (error) {
    console.log(error);
    throw new BadRequestError(`An error occurred`);
  }
};

const localConvert = async (
  opts: ConvertType
): Promise<{ amount: number; currency: string }> => {
  let amount: any = 0;
  let currency: any = opts.to_currency;

  try {
    const kraken = new Cexio();

    //ticker
    const results = await kraken.ticker(opts.from_currency, opts.to_currency);
    console.log(results);
    return {
      amount: results.last,
      currency,
    };
  } catch (error) {}

  return {
    amount: 0,
    currency: "USD",
  };
};

export { currencyConverter, localConvert };
