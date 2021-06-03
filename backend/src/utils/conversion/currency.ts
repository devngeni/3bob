interface ConvertType {
  from_currency: string;
  amount: number;
  to_currency: string;
}
const convert = async (opts: ConvertType) => {
  // perform some actions(conversions

  return { amount: 20, currency: "KES" };
};

export { convert };
