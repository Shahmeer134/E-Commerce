import BaseRepository from "../base/BaseRepository";
import { IOrder, orderSchema } from "../../models/order.Schema";

class OrderRepository extends BaseRepository<IOrder> {
  constructor() {
    super("Order", orderSchema);
  }
}

export default new OrderRepository();
