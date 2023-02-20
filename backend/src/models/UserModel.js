import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model("User", UserSchema);
