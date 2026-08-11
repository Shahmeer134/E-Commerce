import BaseRepository from "../base/BaseRepository.js";
import { INotification, notificationSchema } from "../../models/notification.Schema.js";

class NotificationRepository extends BaseRepository<INotification> {
  constructor() {
    super("Notification", notificationSchema);
  }
}

export default new NotificationRepository();
