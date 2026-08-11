import { Router } from "express";
import reviewController from "../controller/reviewController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

// Create review
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["CUSTOMER"]),
  reviewController.create.bind(reviewController),
);

// Get all reviews
router.get(
  "/",
  reviewController.getAll.bind(reviewController),
);

// Get reviews for a product
router.get(
  "/product/:productId",
  reviewController.getByProduct.bind(reviewController),
);

// Get reviews by customer
router.get(
  "/customer/:customerId",
  authMiddleware,
  reviewController.getByCustomer.bind(reviewController),
);

// Get review by ID
router.get(
  "/:id",
  reviewController.getById.bind(reviewController),
);

// Update own review
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["CUSTOMER"]),
  reviewController.update.bind(reviewController),
);

// Delete own review
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["CUSTOMER"]),
  reviewController.delete.bind(reviewController),
);

export default router;