import { Client } from "africastalking-ts";

const africastalking = new Client({
  apiKey: process.env.AT_SECRET!,
  username: process.env.AT_USERNAME!,
});

/**
 * Auto generate activation random 6 number
 */

const randomCode = () => {
  const digits = 100000;
  const multier = 9000;
  return Math.floor(digits + Math.random() * multier).toString();
};

const sendSMS = async (phoneNumbers: string[], message: string) => {
  const options = {
    to: phoneNumbers,
    message,
  };
  const res = await africastalking.sendSms(options);
  return res;
};

export { randomCode, sendSMS };
