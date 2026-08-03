import BaseRepository from "../base/BaseRepository.js";
import { IProductImages, productImageSchema } from "../../models/productImages.Schema.js";

class ProductImageRepository extends BaseRepository<IProductImages> {
  constructor() {
    super("ProductImage", productImageSchema);
  }
}

export default new ProductImageRepository();
