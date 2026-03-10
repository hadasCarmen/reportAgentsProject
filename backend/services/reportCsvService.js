import { parse } from "csv-parse/sync";
import { reportRegular } from "./reportRegularService.js";

export const reportCsvService = async (csvText, userid) => {
  const records = parse(csvText, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  let createdCount = 0;

  for (const row of records) {
    const { category, urgency, message, imagePath, sourceType } = row;

    try {
      await reportRegular(
        category,
        urgency,
        message,
        imagePath,
        sourceType,
        userid,
      );
      createdCount++;
    } catch (err) {
      console.warn(`Skipping row: ${message}, reason: ${err.message}`);
    }
  }

  return { created: createdCount };
};
