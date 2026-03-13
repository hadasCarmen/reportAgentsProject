import { Report } from "../models/Report.js";

export const reportRegular = async (
  category,
  urgency,
  message,
  sourceType,
  userid,
  imagePath,
) => {
  const report = await Report.findOne({ message: message });
  if (report) {
    throw new Error("this report exist");
  }
  if (!category || !urgency || !message || !sourceType || !userid) {
    throw new Error("details missing");
  }
  console.log(imagePath);
  
  return Report.create({
    category: category,
    urgency: urgency,
    message: message,
    imagePath: imagePath,
    sourceType: sourceType,
    agent: userid,
  });
};
