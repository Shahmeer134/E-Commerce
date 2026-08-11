import { Router } from "express";
import notificationController from "../controller/notificationController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Create notification
router.post(
  "/",
  authMiddleware,
  notificationController.create.bind(notificationController),
);

// Get logged-in user's notifications
router.get(
  "/",
  authMiddleware,
  notificationController.getMyNotifications.bind(
    notificationController,
  ),
);

// Get unread notifications
router.get(
  "/unread",
  authMiddleware,
  notificationController.getUnread.bind(notificationController),
);

// Mark all as read
router.patch(
  "/read-all",
  authMiddleware,
  notificationController.markAllAsRead.bind(
    notificationController,
  ),
);

// Get notification by ID
router.get(
  "/:id",
  authMiddleware,
  notificationController.getById.bind(notificationController),
);

// Mark one notification as read
router.patch(
  "/:id/read",
  authMiddleware,
  notificationController.markAsRead.bind(
    notificationController,
  ),
);

// Delete notification
router.delete(
  "/:id",
  authMiddleware,
  notificationController.delete.bind(notificationController),
);

export default router;