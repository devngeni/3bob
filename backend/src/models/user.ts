import mongoose from "mongoose";
import { PasswordManager } from "./../utils/password";

//And Interface that describes properties that are required new user
interface UserAttrs {
  name: string;
  email: string;
  phone: string;
  solana?: {
    address: string;
    secret_key: string;
  };
  password: string;
  activation_code: string;
}

// An Interface describe the properties a user model can have
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes single user properties
interface UserDoc extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  solana?: {
    address: string;
    secret_key: string;
  };
  created_at?: Date;
  updatedAt?: Date;
  password_changed?: boolean;
  password_changed_at: boolean;
  password_change_token?: string;
  is_active?: boolean;
  activation_code: string;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String, select: false },
    solana: {
      address: { type: String },
      secret_key: { type: String, select: false },
    },
    created_at: { type: Date, default: Date.now() },
    phone: { type: String, unique: true },
    password_changed_at: { type: Date },
    password_changed: { type: Boolean },
    password_change_token: { type: String },
    is_active: { type: Boolean, default: false },
    activation_code: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id; // remap the _id field to id
        delete ret._id; // delete _id field
        delete ret.password;
        delete ret.activation_code;
        delete ret.password_change_token;
      },
      versionKey: false,
    },
  }
);

// method
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// middleware
userSchema.pre(/^find/, function (next) {
  next();
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await PasswordManager.toHash(this.get("password"));
    console.log("Hash", hashed);
    this.set("password", hashed);
  }
  done();
});

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

// User.build({ email: "", password: "" });

export { User, UserDoc };
