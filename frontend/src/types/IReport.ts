export type Report = {
  _id: string;
  agent: string;
  category: string;
  urgency: string;
  message: string;
  imagePath: string;
  sourceType: string;
  createdAt: Date;
  updateAt: Date;
};