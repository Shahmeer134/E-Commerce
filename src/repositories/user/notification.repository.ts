import BaseRepository from "../base/BaseRepository";
import { INotification, notificationSchema } from "../../models/notification.Schema";

class NotificationRepository extends BaseRepository<INotification> {
  constructor() {
    super("Notification", notificationSchema);
  }
}

export default new NotificationRepository();
