import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials!" });
    }

    const hashPassword = user.password;
    const isMatch = await bcrypt.compare(password, hashPassword);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: " Invalid credentials. Try Again." });
    }
    console.log("Usuário recuperado : ", user._id);
    const payload = {
      id: user._id,
      userName: user.userName,
      email,
    };

    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: "1d" };

    const token = jwt.sign(payload, secret, options);

    return res.status(200).send({
      message: "Succesfully! You're logged in!",
      user: user.userName,
      token,
    });
  }

  async register(req, res) {
    const { userName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      userName,
      email,
      password: hashPassword,
    });

    const isRegistered = await user.save();

    isRegistered
      ? res.status(200).json("User Registered successfully!")
      : res.status(400).json({ error: "Cant save this User!" });
  }
}
