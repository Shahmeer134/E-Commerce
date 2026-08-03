import BaseRepository from "../base/BaseRepository.js";
import { IProductVariant, productVariantSchema } from "../../models/productVariants.Schema.js";

class ProductVariantRepository extends BaseRepository<IProductVariant> {
  constructor() {
    super("ProductVariant", productVariantSchema);
  }
}

export default new ProductVariantRepository();
