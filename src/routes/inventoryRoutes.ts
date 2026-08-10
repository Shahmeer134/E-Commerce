import { Router } from "express";
import inventoryController from "../controller/inventoryController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  inventoryController.create.bind(inventoryController),
);

router.get(
  "/",
  inventoryController.getAll.bind(inventoryController),
);

router.get(
  "/product/:productId",
  inventoryController.getByProduct.bind(inventoryController),
);

router.get(
  "/:id",
  inventoryController.getById.bind(inventoryController),
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  inventoryController.update.bind(inventoryController),
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  inventoryController.delete.bind(inventoryController),
);

export default router;