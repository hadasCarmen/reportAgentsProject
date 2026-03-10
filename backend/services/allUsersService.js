import { User } from "../models/User.js";

export const allUsers = async () => {
  const users = await User.find();

  if (!users) {
    throw new Error("Users not found");
  }

  return users;
};
