import BaseRepository from "../base/BaseRepository";
import { ICart, cartSchema } from "../../models/cart.Schema";

class CartRepository extends BaseRepository<ICart> {
  constructor() {
    super("Cart", cartSchema);
  }
}

export default new CartRepository();
