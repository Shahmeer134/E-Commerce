import BaseRepository from "../base/BaseRepository.js";
import { IOrderTracking, orderTrackingSchema } from "../../models/orderTracking.Schema.js";

class OrderTrackingRepository extends BaseRepository<IOrderTracking> {
  constructor() {
    super("OrderTracking", orderTrackingSchema);
  }
}

export default new OrderTrackingRepository();
