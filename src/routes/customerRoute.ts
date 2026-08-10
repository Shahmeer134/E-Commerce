import { Router } from "express";
import customerController from "../controller/customerController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constant/enums.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  customerController.create.bind(customerController),
);

// Get logged-in customer's profile
router.get(
  "/me",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  customerController.getMyProfile.bind(customerController),
);

// Get all customers - Admin
router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  customerController.getAll.bind(customerController),
);

// Get customer by ID - Admin
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.ADMIN]),
  customerController.getById.bind(customerController),
);

// Update logged-in customer's profile
router.patch(
  "/me",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  customerController.update.bind(customerController),
);

// Delete logged-in customer's profile
router.delete(
  "/me",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  customerController.delete.bind(customerController),
);

export default router;