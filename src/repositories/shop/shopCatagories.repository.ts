import BaseRepository from "../base/BaseRepository";
import { IShopCategories, shopCategorySchema } from "../../models/shopCatagories.Schema";

class ShopCategoryRepository extends BaseRepository<IShopCategories> {
  constructor() {
    super("ShopCategory", shopCategorySchema);
  }
}

export default new ShopCategoryRepository();
