import BaseRepository from "../base/BaseRepository";
import { IProductImages, productImageSchema } from "../../models/productImages.Schema";

class ProductImageRepository extends BaseRepository<IProductImages> {
  constructor() {
    super("ProductImage", productImageSchema);
  }
}

export default new ProductImageRepository();
