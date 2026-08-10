import BaseRepository from "../base/BaseRepository.js";
import { ICart, cartSchema } from "../../models/cart.Schema.js";

class CartRepository extends BaseRepository<ICart> {
  constructor() {
    super("Cart", cartSchema);
  }
}

export default new CartRepository();
