import BaseRepository from "../base/BaseRepository.js";
import { IOrderItem, orderItemSchema } from "../../models/orderItems.Schema.js";

class OrderItemRepository extends BaseRepository<IOrderItem> {
  constructor() {
    super("OrderItem", orderItemSchema);
  }
}

export default new OrderItemRepository();
