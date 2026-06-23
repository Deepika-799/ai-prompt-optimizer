import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import optimizeRoute from "./routes/optimize.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", optimizeRoute);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});