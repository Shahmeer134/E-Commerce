import Router from "express";
import ShopController from "../controller/shopController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();
// const ShopController = new shopController();

router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), ShopController.create.bind(ShopController));

router.get("/me", authMiddleware, roleMiddleware(["ADMIN"]), ShopController.get.bind(ShopController));

router.get("/", ShopController.getAll.bind(ShopController));

router.get("/:id", ShopController.getShopById.bind(ShopController));

router.patch("/:id", authMiddleware, roleMiddleware(["ADMIN"]), ShopController.update.bind(ShopController));

router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), ShopController.delete.bind(ShopController));

export default router;