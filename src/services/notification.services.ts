import notificationRepository from "../repositories/user/notification.repository.js";
import userRepository from "../repositories/user/user.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("NotificationService");

class NotificationService {
  // CREATE NOTIFICATION
  async create(data: {
    user: string;
    title: string;
    message: string;
    type: string;
  }) {
    logger.debug(
      {
        userId: data.user,
        type: data.type,
      },
      "Creating notification",
    );

    const user = await userRepository.get({
      _id: data.user,
    });

    if (!user) {
      logger.warn(
        {
          userId: data.user,
        },
        "User not found",
      );

      throw new Error("User not found");
    }

    const notification = await notificationRepository.create({
      user: data.user,
      title: data.title,
      message: data.message,
      type: data.type,
      isRead: false,
    });

    logger.info(
      {
        notificationId: notification._id,
        userId: data.user,
      },
      "Notification created successfully",
    );

    return notification;
  }

  // GET ALL NOTIFICATIONS FOR USER
  async getByUser(userId: string) {
    logger.debug(
      {
        userId,
      },
      "Fetching user notifications",
    );

    const user = await userRepository.get({
      _id: userId,
    });

    if (!user) {
      logger.warn(
        {
          userId,
        },
        "User not found",
      );

      throw new Error("User not found");
    }

    const notifications = await notificationRepository.findAll(
      {
        user: userId,
      },
      null,
      {
        sort: {
          createdAt: -1,
        },
      },
    );

    logger.info(
      {
        userId,
        totalNotifications: notifications.length,
      },
      "User notifications fetched successfully",
    );

    return notifications;
  }

  // GET UNREAD NOTIFICATIONS
  async getUnread(userId: string) {
    logger.debug(
      {
        userId,
      },
      "Fetching unread notifications",
    );

    const notifications = await notificationRepository.findAll(
      {
        user: userId,
        isRead: false,
      },
      null,
      {
        sort: {
          createdAt: -1,
        },
      },
    );

    logger.info(
      {
        userId,
        unreadNotifications: notifications.length,
      },
      "Unread notifications fetched successfully",
    );

    return notifications;
  }

  // GET NOTIFICATION BY ID
  async getById(id: string) {
    logger.debug(
      {
        notificationId: id,
      },
      "Fetching notification",
    );

    const notification = await notificationRepository.get({
      _id: id,
    });

    if (!notification) {
      logger.warn(
        {
          notificationId: id,
        },
        "Notification not found",
      );

      throw new Error("Notification not found");
    }

    return notification;
  }

  // MARK ONE AS READ
  async markAsRead(id: string, userId: string) {
    logger.debug(
      {
        notificationId: id,
        userId,
      },
      "Marking notification as read",
    );

    const notification = await notificationRepository.get({
      _id: id,
    });

    if (!notification) {
      logger.warn(
        {
          notificationId: id,
        },
        "Notification not found",
      );

      throw new Error("Notification not found");
    }

    if (notification.user.toString() !== userId) {
      logger.warn(
        {
          notificationId: id,
          userId,
        },
        "User attempted to access another user's notification",
      );

      throw new Error("You can only update your own notifications");
    }

    const updatedNotification = await notificationRepository.update(
      {
        _id: id,
      },
      {
        $set: {
          isRead: true,
        },
      },
      {
        new: true,
      },
    );

    logger.info(
      {
        notificationId: id,
        userId,
      },
      "Notification marked as read",
    );

    return updatedNotification;
  }

  // MARK ALL AS READ
  async markAllAsRead(userId: string) {
    logger.debug(
      {
        userId,
      },
      "Marking all notifications as read",
    );

    await notificationRepository.updateMany(
      {
        user: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    logger.info(
      {
        userId,
      },
      "All notifications marked as read",
    );

    return true;
  }

  // DELETE NOTIFICATION
  async delete(id: string, userId: string) {
    logger.debug(
      {
        notificationId: id,
        userId,
      },
      "Deleting notification",
    );

    const notification = await notificationRepository.get({
      _id: id,
    });

    if (!notification) {
      logger.warn(
        {
          notificationId: id,
        },
        "Notification not found",
      );

      throw new Error("Notification not found");
    }

    if (notification.user.toString() !== userId) {
      logger.warn(
        {
          notificationId: id,
          userId,
        },
        "User attempted to delete another user's notification",
      );

      throw new Error("You can only delete your own notifications");
    }

    await notificationRepository.delete({
      _id: id,
    });

    logger.info(
      {
        notificationId: id,
        userId,
      },
      "Notification deleted successfully",
    );

    return notification;
  }
}

export default new NotificationService();