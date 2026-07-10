import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import { Types } from "mongoose";

export async function authorizationChecker(req, res) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return "NO-TOKEN";
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return "NO-TOKEN";
    }

    const { _id } = jwt.verify(token, process.env.KEY);
    const id = Types.ObjectId(_id);

    const user = await User.findOne({ _id: id });
    if (!user) {
      return "NOT-AUTHENTICATED";
    } else {
      return user;
    }
  } catch (error) {
    return "NO-TOKEN";
  }
}

export function authorize(res, user, role) {
  if (user && user.role != role) {
    return res.status(403).json({ msg: "not authorized" });
  }
  return true;
}
