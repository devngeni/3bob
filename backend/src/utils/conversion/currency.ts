import axios from "axios";
import { BadRequestError } from "../../errors/bad-request-error";
const { Kraken, Cexio } = require("node-crypto-api");
interface ConvertType {
  from_currency: string;
  amount: number;
  to_currency: string;
}

const currencyConverter = async (opts: ConvertType) => {
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
    throw new BadRequestError(`An error occurred ${error}`);
  }
};

interface HistoricalData {
  duration_in_months: number;
  crypto: string;
}
const getHistoricalData = async (opts: HistoricalData) : Promise<[{date: string, value: string}]> => {
  try {

    const { data } = await axios({
      method: 'GET',
      url: 'https://www.investing.com/common/modules/js_instrument_chart/api/data.php',
      params: {
        pair_id: await getPair(opts.crypto),
        pair_interval: '86400', // 1 day
        chart_type: 'area', // 'area', 'candlestick'
        candle_count: '120', // days
        volume_series: 'yes',
        events: 'yes',
        period: `${opts.duration_in_months}-month`
      },
      headers: {
        'Referer': 'https://www.investing.com/',
        'X-Requested-With': 'XMLHttpRequest',
      }
    })


    console.log(data)
    return data.candles ? data.candles.map((item: Array<number>) => ({
      date: item[0],
      value: item[1]
    })) : []

  } catch (error) {
    console.log(error)
    throw new BadRequestError(`An error occurred`);
  }
};

const getPair = async (crypto: string): Promise<string> => {
  let mappings = [
    {
      pairId: '945629',
      title: 'BTC/USD - Bitcoin US Dollar',
      name: 'BTC/USD'
    },
    {
      pairId: '997650',
      title: 'ETH/USD - Ethereum US Dollar',
      name: 'ETH/USD'
    },
  ]
  for (const mapping of mappings) {
    if (mapping.name == `${crypto.toUpperCase()}/USD`) {
      return mapping.pairId;
    }
  }
  return `No mapping found for ${crypto}!`
}


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

export { currencyConverter, localConvert , getHistoricalData};
