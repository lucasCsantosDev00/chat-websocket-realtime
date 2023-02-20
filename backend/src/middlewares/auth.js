import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default async (socket, next) => {
  //Authentication Middleware
  if (socket.handshake.query && socket.handshake.query.token !== undefined) {
    try {

      const isValidToken = await jwt.verify(
        socket.handshake.query.token,
        secret
      );

      if (isValidToken) {
        next();
      }
    } catch (error) {
      console.log(error);
      return next(new Error("Your token is invalid!"));
    }
  }
};
