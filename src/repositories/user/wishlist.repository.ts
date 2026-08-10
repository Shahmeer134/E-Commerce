import BaseRepository from "../base/BaseRepository.js";
import { IWishlist, wishlistSchema } from "../../models/wishlist.Schema.js";

class WishlistRepository extends BaseRepository<IWishlist> {
  constructor() {
    super("Wishlist", wishlistSchema);
  }
}

export default new WishlistRepository();
