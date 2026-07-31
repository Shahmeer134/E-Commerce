import BaseRepository from "../base/BaseRepository";
import { IProductVariant, productVariantSchema } from "../../models/productVariants.Schema";

class ProductVariantRepository extends BaseRepository<IProductVariant> {
  constructor() {
    super("ProductVariant", productVariantSchema);
  }
}

export default new ProductVariantRepository();
