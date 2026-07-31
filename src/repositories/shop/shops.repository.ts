import BaseRepository from "../base/BaseRepository";
import { IShop, shopSchema } from "../../models/shops.Schema";

class ShopRepository extends BaseRepository<IShop> {
  constructor() {
    super("Shop", shopSchema);
  }
}

export default new ShopRepository();
