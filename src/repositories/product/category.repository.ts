import BaseRepository from "../base/BaseRepository.js";
import { ICategories, categorySchema } from "../../models/category.Schema.js";

class CategoryRepository extends BaseRepository<ICategories> {
  constructor() {
    super("Category", categorySchema);
  }
}

export default new CategoryRepository();
