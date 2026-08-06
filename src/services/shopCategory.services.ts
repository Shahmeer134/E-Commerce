import shopCategoryRepository from "../repositories/shop/shopCategory.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("ShopCategoryService");

class ShopCategoryService {
  async create(data: any) {
    logger.debug("Creating shop category");

    const existingCategory = await shopCategoryRepository.get({
      shopCategoryName: data.shopCategoryName,
    });

    if (existingCategory) {
      logger.warn("Shop category already exists");

      throw new Error("Shop category already exists");
    }

    const shopCategory = await shopCategoryRepository.create({
      shopCategoryName: data.shopCategoryName,
      description: data.description,
    });

    logger.info("Shop category created successfully");

    return shopCategory;
  }

  async getAll() {
    logger.debug("Fetching all shop categories");

    const categories = await shopCategoryRepository.findAll();

    logger.info("Fetched all shop categories successfully");

    return categories;
  }

  async getById(id: string) {
    logger.debug(`Fetching shop category: ${id}`);

    const category = await shopCategoryRepository.get({ _id: id });

    if (!category) {
      logger.warn(`Shop category not found: ${id}`);

      throw new Error("Shop category not found");
    }

    return category;
  }

  async update(id: string, data: any) {
    logger.debug(`Updating shop category: ${id}`);

    if (data.shopCategoryName) {
      const existingCategory = await shopCategoryRepository.get({
        shopCategoryName: data.shopCategoryName,
        _id: { $ne: id },
      });

      if (existingCategory) {
        logger.warn("Shop category already exists");

        throw new Error("Shop category already exists");
      }
    }

    const category = await shopCategoryRepository.update(
      {
        _id: id,
      },
      {
        $set: {
          ...(data.shopCategoryName && {
            shopCategoryName: data.shopCategoryName,
          }),
          ...(data.description && {
            description: data.description,
          }),
        },
      },
      {
        new: true,
      },
    );

    if (!category) {
      logger.warn(`Shop category not found: ${id}`);

      throw new Error("Shop category not found");
    }

    logger.info("Shop category updated successfully");

    return category;
  }

  async delete(id: string) {
    logger.debug(`Deleting shop category: ${id}`);

    const category = await shopCategoryRepository.delete({
      _id: id,
    });

    if (!category) {
      logger.warn(`Shop category not found: ${id}`);
      
      throw new Error("Shop category not found");
    }

    logger.info("Shop category deleted successfully")

    return category;
  }
}

export default new ShopCategoryService();
