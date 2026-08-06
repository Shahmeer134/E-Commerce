import BaseRepository from "../base/BaseRepository.js";
import { IShop, shopSchema } from "../../models/shop.Schema.js";

class ShopRepository extends BaseRepository<IShop> {
  constructor() {
    super("Shop", shopSchema);
  }
}

export default new ShopRepository();
