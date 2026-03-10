import { allUsers } from "../services/allUsersService.js";

export const allUsersController = async (req, res) => {
  try {
    
    const getAllUsers = await allUsers();
    res.status(200).json(getAllUsers);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }
};
