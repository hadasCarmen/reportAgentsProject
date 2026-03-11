import {reportRegular} from  "../services/reportRegularService.js";

export const reportRegularController=async (req,res)=>{
    try {
        const { category, urgency,message,imagePath,sourceType } = req.body;
        const reportRegularReady = await reportRegular(category, urgency,message,sourceType,req.user.id,imagePath);
        res.status(200).json(reportRegularReady);
      } catch (error) {
        console.error(error);
    
        res.status(500).json({ error: error.message });
      }
}