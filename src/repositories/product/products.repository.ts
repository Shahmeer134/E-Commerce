import BaseRepository from "../base/BaseRepository";
import { IProduct, productSchema } from "../../models/products.Schema";

class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super("Product", productSchema);
  }
}

export default new ProductRepository();
