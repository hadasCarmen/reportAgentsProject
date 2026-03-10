import { atbashCipher } from "../hash/atbash.js";
import { User } from "../models/User.js";

export const signinUser = async (username, password,agentCode, role='agent') => {
  const user = await User.findOne({ username: username.trim().toLowerCase() });

  if (user) {
    throw new Error("User exist");
  }
  if (password.length < 6) {
    throw new Error("password need be more longer");
  }
  if (role !== "agent" && role !== "admin") {
    throw new Error("role not legal");
  }
  const atpassword=atbashCipher(password)
  return User.create({
    username: username,
    password: atpassword,
    role: role,
    agentCode:agentCode
  })
};
