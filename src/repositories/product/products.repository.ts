import BaseRepository from "../base/BaseRepository.js";
import { IProduct, productSchema } from "../../models/products.Schema.js";

class ProductRepository extends BaseRepository<IProduct> {
  constructor() {
    super("Product", productSchema);
  }
}

export default new ProductRepository();
