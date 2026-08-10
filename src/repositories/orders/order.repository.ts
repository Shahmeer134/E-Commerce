import BaseRepository from "../base/BaseRepository.js";
import { IOrder, orderSchema } from "../../models/order.Schema.js";

class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super("Order", orderSchema);
  }
}

export default new OrderRepository();
