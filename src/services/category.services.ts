import slugify from "slugify";
import categoryRepository from "../repositories/category/category.repository.js";
import { logger } from "../utils/helper.js";
// import { CategoryRepository } from "../repositories/index.js";

class CategoryService {
  async create(data: any) {
    logger.debug(
      {
        categoryName: data.categoryName,
        parentCategory: data.parentCategory,
      },
      "Creating category",
    );

    const existingCategory = await categoryRepository.get({
      categoryName: data.categoryName,
    });

    if (existingCategory) {
      logger.warn(
        {
          categoryName: data.categoryName,
        },
        "Category already exists",
      );

      throw new Error("Category already exists");
    }

    if (data.parentCategory) {
      const parent = await categoryRepository.get({
        _id: data.parentCategory,
      });

      if (!parent) {
        logger.warn(
          {
            parentCategoryId: data.parentCategory,
          },
          "Parent category not found",
        );

        throw new Error("Parent category not found");
      }
    }

    const slug = slugify(data.categoryName, {
      lower: true,
      strict: true,
    });

    const category = await categoryRepository.create({
      parentCategory: data.parentCategory || null,
      categoryName: data.categoryName,
      slug,
      image: data.image,
      description: data.description,
    });
    logger.info(
      {
        categoryId: category._id.toString(),
        categoryName: category.categoryName,
      },
      "Category created successfully",
    );

    return category;
  }

  async getAll() {
    return await (categoryRepository as any).findAll({});
  }

  async getById(id: string) {
    const category = await categoryRepository.get({
      _id: id,
    });

    if (!category) {
      logger.warn(
        {
          categoryId: id,
        },
        "Category not found",
      );

      throw new Error("Category not found");
    }

    logger.info(
      {
        categoryId: id,
      },
      "Category fetched successfully",
    );

    return category;
  }

  async update(id: string, data: any) {
    logger.debug(
      {
        categoryId: id,
        fields: Object.keys(data),
      },
      "Updating category",
    );

    const category = await categoryRepository.get({
      _id: id,
    });

    if (!category) {
      logger.warn(
        {
          categoryId: id,
        },
        "Category not found for update",
      );
      return category;
    }

    if (data.categoryName) {
      data.slug = slugify(data.categoryName, {
        lower: true,
        strict: true,
      });
    }

    return await categoryRepository.update({ _id: id }, data, { new: true });
  }

  async delete(id: string) {
    logger.debug(
      {
        categoryId: id,
      },
      "Deleting category",
    );

    const category = await categoryRepository.get({
      _id: id,
    });

    if (!category) {
      logger.warn(
        {
          categoryId: id,
        },
        "Category not found for deletion",
      );

      throw new Error("Category not found");
    }

    logger.info(
      {
        categoryId: id,
      },
      "Category deleted successfully",
    );

    await categoryRepository.delete({
      _id: id,
    });

    return true;
  }
}

export default new CategoryService();
