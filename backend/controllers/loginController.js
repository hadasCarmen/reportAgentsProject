import { loginUser } from "../services/loginService.js";

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const login = await loginUser(username, password);
    res.status(200).json(login);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
};
