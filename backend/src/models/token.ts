import { Model, Schema, model, Document } from "mongoose";

interface Attrs {
  token: string;
}

interface TokenModel extends Model<TokenDoc> {
  build(attrs: Attrs): TokenDoc;
}

interface TokenDoc extends Document {
  token: string;
  created_at?: Date;
  is_active?: boolean;
}

const tokenSchema = new Schema(
  {
    token: { type: String, required: true },
    created_at: {
      type: Date,
      default: new Date().toLocaleString("en-US", {
        timeZone: "Africa/Nairobi",
      }),
    },
    is_active: { type: Boolean, default: true },
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

tokenSchema.statics.build = (attrs: Attrs) => {
  return new Token(attrs);
};

const Token = model<TokenDoc, TokenModel>("Token", tokenSchema);
export { Token };
