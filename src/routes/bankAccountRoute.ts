import { Router } from "express";
import bankAccountController from "../controller/backAccountController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constant/enums.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  bankAccountController.create.bind(bankAccountController),
);

router.get(
  "/shop/:shopId",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  bankAccountController.getByShop.bind(bankAccountController),
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  bankAccountController.getById.bind(bankAccountController),
);

router.patch(
  "/shop/:shopId",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  bankAccountController.update.bind(bankAccountController),
);

router.delete(
  "/shop/:shopId",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  bankAccountController.delete.bind(bankAccountController),
);

export default router;