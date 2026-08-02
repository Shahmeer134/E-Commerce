import { Request, Response } from "express";
import categoryService from "../services/category.services.js";

class CategoryController {
  async create(req: Request, res: Response) {
    const category = await categoryService.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  }

  async getAll(req: Request, res: Response) {
    const categories = await categoryService.getAll();

    return res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const category = await categoryService.getById(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  }

  async update(req: Request<{ id: string }>, res: Response) {
    const category = await categoryService.update(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    await categoryService.delete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  }
}

export default new CategoryController();
