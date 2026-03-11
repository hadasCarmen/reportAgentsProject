import { reportCsvService } from "../services/reportCsvService.js";

export const reportCsvController = async (req, res) => {
  try {
    
    const csv = req.file.buffer.toString();;
    if (!csv) return res.status(400).json({ error: "CSV required" });

    const result = await reportCsvService(csv, req.user.id);
    res.status(200).json({ message: "CSV processed", ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};