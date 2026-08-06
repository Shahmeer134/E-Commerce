import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/userRoute.js";
import shopRoutes from "./routes/shopRoute.js";
import ShopCategoryRoutes from "./routes/shopCategoryRoutes.js"
import { Logger } from "./utils/logger.js";
import categoryRoutes from "./routes/categoryRoute.js";

dotenv.config();
const PORT = 4000

const app = express();
app.use(express.json())

const authRoutes = new AuthRoutes();

app.use(authRoutes.getRouterGroup(), authRoutes.getRoute());
app.use("/shops", shopRoutes)
app.use("/shop-categories", ShopCategoryRoutes)

app.use("/categories", categoryRoutes.getRoute());
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

