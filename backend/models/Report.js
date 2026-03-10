import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: { type: String, required: true },
  urgency: { type: String, required: true },
  message: { type: String, required: true },
  imagePath: { type: String,default:"default.jpg" },
  sourceType: { type: String,
    enum:["csv","handing"],
    default: "csv", required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

export const Report = mongoose.model("Report", reportSchema, "reports");
