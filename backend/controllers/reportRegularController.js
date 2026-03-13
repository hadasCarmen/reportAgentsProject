import { reportRegular } from "../services/reportRegularService.js";

export const reportRegularController = async (req, res) => {
  try {
    const { category, urgency, message, sourceType } = req.body;
    console.log(req.file);
    
    const imagePath = req.file ? req.file.path : null;
    const reportRegularReady = await reportRegular(
      category,
      urgency,
      message,
      sourceType,
      req.user.id,
      imagePath,
    );
    res.status(200).json(reportRegularReady);
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error.message });
  }
};
