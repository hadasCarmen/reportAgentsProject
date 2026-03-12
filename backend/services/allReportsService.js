import { Report } from "../models/Report.js";

export const allReports = async (filters) => {
  
  const {agent,category,urgency}=filters
  
  const filtering={}
  if (agent) {
    filtering.agent=agent
  }
  if (category) {
    filtering.category=category
  }
  if (urgency) {
    filtering.urgency=urgency
  }
console.log(filtering);

  const repotrs = await Report.find(filtering);
console.log(repotrs);

  if (!repotrs) {
    throw new Error("repotrs not found");
  }

  return repotrs;
};