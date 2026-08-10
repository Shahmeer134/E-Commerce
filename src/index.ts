import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoutes from "./routes/userRoute.js";
import shopRoutes from "./routes/shopRoute.js";
import productRoutes from "./routes/productRoute.js";
import ShopCategoryRoutes from "./routes/shopCategoryRoutes.js";
import productVariantRoutes from "./routes/productVariantRoutes.js";
import productImageRoutes from "./routes/productImageRoute.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import customerRoutes from "./routes/customerRoute.js";
import { Logger } from "./utils/logger.js";
import categoryRoutes from "./routes/categoryRoute.js";
import customerAddressRoutes from "./routes/customerAddressRoutes.js";
import cartRoutes from "./routes/cartRoute.js";
import wishlistRoutes from "./routes/wishlistRoute.js";
import bankAccountRoutes from "./routes/bankAccountRoute.js";

dotenv.config();
const PORT = 4000;

const app = express();
app.use(express.json());

const authRoutes = new AuthRoutes();

app.use(authRoutes.getRouterGroup(), authRoutes.getRoute());
app.use("/shops", shopRoutes);
app.use("/shop-categories", ShopCategoryRoutes);
app.use("/bank-accounts", bankAccountRoutes);
app.use("/categories", categoryRoutes.getRoute());
app.use("/products", productRoutes);
app.use("/product-variants", productVariantRoutes);
app.use("/product-images", productImageRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/customers", customerRoutes);
app.use("/customer-addresses", customerAddressRoutes);
app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);

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

startServer();
// const server = createServer(app);
