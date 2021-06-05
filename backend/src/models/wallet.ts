/** @format */
import { Model, Schema, model, Document } from "mongoose";

interface Attrs {
  user?: string;
  amount_in?: number;
  amount_out?: number;
  amount_balance?: number;
}

interface WalletModel extends Model<WalletDoc> {
  build(attrs: Attrs): WalletDoc;
}

interface WalletDoc extends Document {
  user?: string;
  wallet_type: string;
  amount_in: number;
  amount_out: number;
  amount_balance?: number;
  is_active?: boolean;
  created_at?: Date;
}

const wallet_schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    wallet_type: {
      type: String,
      enum: { values: ["user", "app"] },
      message: "Wallet Type should only be of user, or app",
    },
    amount_in: { type: Number, default: 0.0 },
    amount_out: { type: Number, default: 0.0 },
    amount_balance: { type: Number, default: 0.0 },
    is_active: { type: Boolean, default: true },
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
        ret.id = ret._id; // remap the _id field to id
        delete ret._id; // delete _id field
      },
      versionKey: false,
    },
  }
);

wallet_schema.pre<WalletDoc>(/^find/, function (next) {
  this.populate({ path: "user" });
  next();
});

const Wallet = model<WalletDoc, WalletModel>("Wallet", wallet_schema);
export { Wallet, WalletDoc };
