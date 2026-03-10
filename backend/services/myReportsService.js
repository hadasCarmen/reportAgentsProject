import { Report } from "../models/Report.js";

export const myReports = async (userid) => {
  const repotrs = await Report.find({ agent: userid });

  if (!repotrs) {
    throw new Error("repotrs not found");
  }

  return repotrs;
};