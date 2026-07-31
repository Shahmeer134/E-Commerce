import BaseRepository from "../base/BaseRepository";
import { IOrderTracking, orderTrackingSchema } from "../../models/orderTracking.Schema";

class OrderTrackingRepository extends BaseRepository<IOrderTracking> {
  constructor() {
    super("OrderTracking", orderTrackingSchema);
  }
}

export default new OrderTrackingRepository();
