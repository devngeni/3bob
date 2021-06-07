import { mpesaPhoneFormat } from "./common";
const mpesa = require("mpesa-node");
// import  from  'mpesa-node'

const mpesaApi = new mpesa({
  consumerKey: process.env.CONSUMER_KEY!,
  consumerSecret: process.env.CONSUMER_SECRET!,
  // environment: "production",
  shortCode: process.env.SHORT_CODE!,
  initiatorName: "WJS TECHNOLOGIES LIMITED",
  lipaNaMpesaShortCode: process.env.LNMO_SHORTCODE!,
  lipaNaMpesaShortPass: process.env.LNMO_PASSKEY!,
  certPath: "./../keys/cert.cer",
});

interface STKData {
  phone: string;
  amount: number;
  callbackURL: string;
  accountNumber: string;
}
export interface initData {
  checkoutId: string;
  accountNumber: string;
  type: string;
  amount: number;
  phone: string;
}

export const initiateSTK = async (opts: STKData) => {
  const response = await mpesaApi
    .lipaNaMpesaOnline(
      opts.phone,
      opts.amount,
      opts.callbackURL,
      opts.accountNumber
    )
    .catch((e: any) => {
      console.log(e);
      return e["response"];
    });

  console.log(response.data);

  const data = {
    checkoutId: response.data.CheckoutRequestID,
    accountNumber: opts.accountNumber,
    type: "income",
    amount: opts.amount,
    phone: opts.phone,
  };

  if (!data["checkoutId"]) {
    return {
      error: "Could not initiate payment. Try again!",
    };
  }
  return data; // save this response to database
};

export const receiveSTKPushPayloadFromCallbackURL = async (stkPayload: any) => {
  const resultDesc = stkPayload["Body"]["stkCallback"]["ResultDesc"].toString();
  console.log(resultDesc);

  const status = resultDesc.search(/]/)
    ? resultDesc.substr(resultDesc.search(/]/) + 1)
    : resultDesc;

  const checkoutId = stkPayload["Body"]["stkCallback"]["CheckoutRequestID"];

  // [STK_CB - ]SMSC ACK timeout, [STK_CB - ]DS timeout, [STK_CB - ]Request cancelled by user
  // The service request is processed successfully.

  let message = null;

  switch (status) {
    case "DS timeout":
      message = `Request failed. M-Pesa didn't respond. Try again in 5 seconds.`;
      break;

    case "SMSC ACK timeout":
      message =
        "Request failed. You did not respond, may be your phone is not reachable.";
      break;

    case "Request cancelled by user":
      message = "Request cancelled. You cancelled request. Try again.";
      break;

    case "The balance is insufficient for the transaction":
      message = "The balance is insufficient for the transaction. Try again.";
      break;

    case "The service request is processed successfully.":
      message = "Request successful. Transaction has been processed.";
      break;
    default:
      break;
  }

  if (!status.includes("successful")) {
    /**
     *  delete refered transaction, using checkoutId
     *  send notification using MQTT
     *
     */
    return {
      data: null,
    };
  }

  const data = stkPayload["Body"]["stkCallback"]["CallbackMetadata"]["Item"];

  return {
    amount: data.find((a: any) => a.Name === "Amount").Value,
    phone: data.find((a: any) => a.Name === "PhoneNumber").Value,
    transactionId: data.find((a: any) => a.Name === "MpesaReceiptNumber").Value,
    checkoutId,
    moreData: data,
  };
};

/*QueryLipaNaMpesa Transactions*/

export const lipaNaMpesaQuery = async (checkoutRequestId: string) => {
  const result = await mpesaApi.lipaNaMpesaQuery(checkoutRequestId);
  return result;
};

export const B2C = async (phone: string, amount: number) => {
  console.log(mpesaApi.configs);
  const { shortCode } = mpesaApi.configs;
  //   console.log(shortCode, mpesaPhoneFormat(phone), amount);
  const resp = await mpesaApi.b2c(
    shortCode,
    mpesaPhoneFormat(phone),
    amount,
    `${process.env.APP_URL}/api/payments/timeout-url`,
    `${process.env.APP_URL}/api/payments/success-url`
  );

  console.log(resp);

  return resp;
};

export const registerC2B = async () => {
  await mpesaApi.c2bRegister(
    `${process.env.APP_URL}/api/payments/validation`,
    `${process.env.APP_URL}/api/payments/c2b-callback-url`
  );
};

export const C2BSimulate = async (opts: {
  phone: string;
  accountNumber: any;
  amount: number;
}) => {
  const response = await mpesaApi.c2bSimulate(
    opts.phone,
    opts.amount,
    Math.random().toString(35).substr(2, 7)
  );

  return response;
};

export { mpesaApi };
