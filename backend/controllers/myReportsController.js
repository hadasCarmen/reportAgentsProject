import { myReports } from "../services/myReportsService.js";

export const myReportsController = async (req, res) => {
  try {

    const getMyReports = await myReports(req.user.id);
    res.status(200).json(getMyReports);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }
};
