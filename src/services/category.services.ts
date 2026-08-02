import slugify from "slugify";
import categoryRepository from "../repositories/product/category.repository.js";
// import { CategoryRepository } from "../repositories/index.js";

class CategoryService {
  async create(data: any) {
    const existingCategory = await categoryRepository.get({
      categoryName: data.categoryName,
    });

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    if (data.parentCategory) {
      const parent = await categoryRepository.get({
        _id: data.parentCategory,
      });

      if (!parent) {
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
    return category;
  }

  async getAll() {
    return await (categoryRepository as any).getAll({});
  }

  async getById(id: string) {
    const category = await categoryRepository.get({
      _id: id,
    });

    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async update(id: string, data: any) {
    const category = await categoryRepository.get({
      _id: id,
    });

    if (!category) {
      throw new Error("Category not found");
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
    const category = await categoryRepository.get({
      _id: id,
    });

    if (!category) {
      throw new Error("Category not found");
    }

    await categoryRepository.delete({
      _id: id,
    });

    return true;
  }
}

export default new CategoryService();
