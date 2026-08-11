import BaseRepository from "../base/BaseRepository.js";
import { IShipping, shippingSchema } from "../../models/shipping.Schema.js";

class ShippingRepository extends BaseRepository<IShipping> {
  constructor() {
    super("Shipping", shippingSchema);
  }
}

export default new ShippingRepository();
