import BaseRepository from "../base/BaseRepository";
import { ICategories, categorySchema } from "../../models/categories.Schema";

class CategoryRepository extends BaseRepository<ICategories> {
  constructor() {
    super("Category", categorySchema);
  }
}

export default new CategoryRepository();
