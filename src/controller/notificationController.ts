import { Request, Response } from "express";
import notificationService from "../services/notification.services.js";

class NotificationController {
  // POST /notifications
  async create(req: Request, res: Response) {
    try {
      const notification = await notificationService.create(req.body);

      return res.status(201).json({
        message: "Notification created successfully",
        data: notification,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /notifications
  async getMyNotifications(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const notifications =
        await notificationService.getByUser(userId);

      return res.status(200).json({
        message: "Notifications fetched successfully",
        data: notifications,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /notifications/unread
  async getUnread(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const notifications =
        await notificationService.getUnread(userId);

      return res.status(200).json({
        message: "Unread notifications fetched successfully",
        data: notifications,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /notifications/:id
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const notification = await notificationService.getById(
        id as string,
      );

      return res.status(200).json({
        message: "Notification fetched successfully",
        data: notification,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  // PATCH /notifications/:id/read
  async markAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const notification =
        await notificationService.markAsRead(
          id as string,
          userId,
        );

      return res.status(200).json({
        message: "Notification marked as read",
        data: notification,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // PATCH /notifications/read-all
  async markAllAsRead(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      await notificationService.markAllAsRead(userId);

      return res.status(200).json({
        message: "All notifications marked as read",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // DELETE /notifications/:id
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      await notificationService.delete(
        id as string,
        userId,
      );

      return res.status(200).json({
        message: "Notification deleted successfully",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new NotificationController();