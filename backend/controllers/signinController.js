import { signinUser } from "../services/signinService.js";

export const signinController = async (req, res) => {
  try {
    const { username, password, agentCode, role } = req.body;
    const signin = await signinUser(username, password, agentCode, role);
    res.status(200).json(signin);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
};
