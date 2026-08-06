import { Request, Response } from "express";
import shopCategoryService from "../services/shopCategory.services.js";

class ShopCategoryController {
  async create(req: Request, res: Response) {
    try {
      const category = await shopCategoryService.create(req.body);

      return res.status(201).json({
        message: "Shop category created successfully",
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const categories = await shopCategoryService.getAll();

      return res.status(200).json({
        message: "Shop categories fetched successfully",
        data: categories,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const category = await shopCategoryService.getById(id);

      return res.status(200).json({
        message: "Shop category fetched successfully",
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const category = await shopCategoryService.update(id, req.body);

      return res.status(200).json({
        message: "Shop category updated successfully",
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const category = await shopCategoryService.delete(id);

      return res.status(200).json({
        message: "Shop category deleted successfully",
        data: category,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new ShopCategoryController();
