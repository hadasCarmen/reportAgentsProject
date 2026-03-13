import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/usersRoutes.js";
import { connectDB } from "./db/connect.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
await connectDB()
app.use('/uploads',express.static('uploads'))
app.use("/", router);

app.listen(5000, () => {
  console.log("run port 5000");
});