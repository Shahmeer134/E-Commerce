import BaseRepository from "../base/BaseRepository";
import { ICartItem, cartItemSchema } from "../../models/cartItems.Schema";

class CartItemRepository extends BaseRepository<ICartItem> {
  constructor() {
    super("CartItem", cartItemSchema);
  }
}

export default new CartItemRepository();
