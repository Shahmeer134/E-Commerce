import BaseRepository from "../base/BaseRepository.js";
import { ICartItem, cartItemSchema } from "../../models/cartItems.Schema.js";

class CartItemRepository extends BaseRepository<ICartItem> {
  constructor() {
    super("CartItem", cartItemSchema);
  }
}

export default new CartItemRepository();
