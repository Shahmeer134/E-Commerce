import BaseRepository from "../base/BaseRepository.js";
import { IShopCategories, shopCategorySchema } from "../../models/shopCatagories.Schema.js";

class ShopCategoryRepository extends BaseRepository<IShopCategories> {
  constructor() {
    super("ShopCategory", shopCategorySchema);
  }
}

export default new ShopCategoryRepository();
