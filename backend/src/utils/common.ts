import { Client } from "africastalking-ts";

const africastalking = new Client({
  apiKey: process.env.AT_SECRET!,
  username: process.env.AT_USERNAME!,
});

/** PROMISIFY ARRAY */

const fn = (v: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(v);
    }, 250);
  });
};

const promisifyArray = (items: any) => {
  let actions = items.map(fn);
  return Promise.all(actions);
};

const allowedFields = (obj: any, ...fields: any) => {
  let newObject: any = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

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
    // from: "WJSTech",
    message,
  };
  const res = await africastalking.sendSms(options);
  return res;
};

const accountNumber = () => {
  return Math.random().toString(35).substr(2, 7);
};

const encrypt = async (value: string) => {
  let bufferObj = Buffer.from(value, "utf8");
  return bufferObj.toString("base64");
};

const decrypt = async (value: string) => {
  let bufferObj = Buffer.from(value, "base64");
  return bufferObj.toString("utf8");
};

const mpesaPhoneFormat = (phone: string) => {
  let phoneNumber = "";
  if (phone.startsWith("254")) {
    phoneNumber = phone;
  } else if (phone.startsWith("0")) {
    phoneNumber = phone.replace("0", "254");
  } else if (phone.startsWith("7")) {
    phoneNumber = "254" + phone;
  } else if (phone.startsWith("+")) {
    phoneNumber = phone.replace("+", "");
  } else if (phone.startsWith("+254")) {
    phoneNumber = phone.replace("+", "");
  }
  return phoneNumber;
};

export {
  randomCode,
  sendSMS,
  promisifyArray,
  accountNumber,
  mpesaPhoneFormat,
  allowedFields,
  encrypt,
  decrypt,
};
