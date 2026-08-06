import { Router } from "express";
import shopCategoryController from "../controller/shopCategoryController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";


const router = Router();

router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), shopCategoryController.create.bind(shopCategoryController));

router.get("/", shopCategoryController.getAll.bind(shopCategoryController));

router.get("/:id", shopCategoryController.getById.bind(shopCategoryController));

router.patch("/:id", authMiddleware, roleMiddleware(["ADMIN"]), shopCategoryController.update.bind(shopCategoryController));

router.delete("/:id", authMiddleware, roleMiddleware(["ADMIN"]), shopCategoryController.delete.bind(shopCategoryController));

export default router;