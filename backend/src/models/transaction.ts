import { Model, Schema, model, Document } from "mongoose";
import { User } from "./index";
interface Attrs {
  user?: string;
  checkoutId?: string;
  transactionId: string;
  transaction_type: string;
  amount: number;
  narations?: string;
  phone: string;
  status: string;
}

interface TransModel extends Model<TransDoc> {
  build(attrs: Attrs): TransDoc;
}

interface TransDoc extends Document {
  user?: string;
  checkoutId?: string;
  transactionId: string;
  transaction_type: string;
  amount: number;
  narations?: string;
  phone: string;
  status: string;
  created_at?: any;
}
const transSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: User },
    checkoutId: { type: String },
    transactionId: { type: String },
    transaction_type: {
      type: String,
      enum: {
        values: [
          "deposit",
          "payment",
          "withdrawal",
          "revenue",
          "refund",
          "app charges",
          "income",
        ],
      },
    },
    amount: { type: Number },
    phone: { type: String },
    status: {
      type: String,
      enum: { values: ["pending", "failed", "success"] },
    },
    narations: { type: String },
    created_at: {
      type: Date,
      default: new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      }),
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);
transSchema.statics.build = (attrs: Attrs) => {
  return new Transaction(attrs);
};

transSchema.pre<TransDoc>(/^find/, function (next) {
  this.populate({ path: "user" });
  next();
});

const Transaction = model<TransDoc, TransModel>("Transaction", transSchema);

export { Transaction, TransDoc };
