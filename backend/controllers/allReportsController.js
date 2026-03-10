import { allReports } from "../services/allReportsService.js";

export const allReportsController = async (req, res) => {
  try {
    const filters=req.query
    const getAllReports = await allReports(filters);
    res.status(200).json(getAllReports);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: error.message });

  }
};
