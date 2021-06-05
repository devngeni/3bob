import axios from "axios";
import { BadRequestError } from "../../errors/bad-request-error";

interface ConvertType {
  from_currency: string;
  amount: number;
  to_currency: string;
}

const currencyConverter = async (opts: ConvertType) => {
  // perform some actions(conversions
  // Create a new conversion pair
  const pair = `${opts.from_currency}_${opts.to_currency}`;
  try {
    const url = `https://free.currconv.com/api/v7/convert?q=${pair}&compact=ultra&apiKey=${process
      .env.FOREX_CURRENCY_CONVERTER_API!}`;
    const { data } = await axios.get(url);
    return {
      amount: parseFloat(data[pair]) * opts.amount,
      currency: opts.to_currency,
    };
  } catch (error) {
    // console.log(`Error: ${error}`);
    throw new BadRequestError(`An error occurred`);
  }
};

export { currencyConverter };
