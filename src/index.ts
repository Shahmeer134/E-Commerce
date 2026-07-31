import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/userRoute.js";
import { Logger } from "./utils/logger.js";

dotenv.config();
const PORT = 4000

const app = express();
app.use(express.json())

const authRoutes = new AuthRoutes();

app.use(authRoutes.getRouterGroup(), authRoutes.getRoute());
const logger = new Logger("Server");


logger.log("Server Started");

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer()
// const server = createServer(app);

