import BaseRepository from "../base/BaseRepository";
import { IShipping, shippingSchema } from "../../models/shipping.Schema";

class ShippingRepository extends BaseRepository<IShipping> {
  constructor() {
    super("Shipping", shippingSchema);
  }
}

export default new ShippingRepository();
