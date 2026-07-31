import BaseRepository from "../base/BaseRepository";
import { IWishlist, wishlistSchema } from "../../models/wishlist.Schema";

class WishlistRepository extends BaseRepository<IWishlist> {
  constructor() {
    super("Wishlist", wishlistSchema);
  }
}

export default new WishlistRepository();
