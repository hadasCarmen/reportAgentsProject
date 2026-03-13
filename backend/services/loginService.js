import { User } from "../models/User.js";
import { atbashCipher } from "../hash/atbash.js";

import jwt from "jsonwebtoken";


export const loginUser = async (username, password) => {
  const user = await User.findOne({ username: username.trim().toLowerCase() });

  if (!user) {
    throw new Error("User not found");
  }
  if (user.password !== atbashCipher(password)) {
    throw new Error("wrong password");
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "10h" },
  );

  return { token};
};
