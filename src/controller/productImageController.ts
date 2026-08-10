import { Request, Response } from "express";
import productImageService from "../services/productImage.services.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("ProductImageController");

class ProductImageController {
  async create(req: Request, res: Response) {
    try {
      const image = await productImageService.create(req.body);
      return res.status(201).json({
        message: "Product image created successfully",
        data: image,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to create image",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getAllByProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      if (typeof productId !== "string") {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }
      const images = await productImageService.getAllByProduct(productId);

      return res.status(200).json({
        message: "Product images fetched successfully",
        data: images,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch product images",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }
      const image = await productImageService.getById(id);

      return res.status(200).json({
        message: "Product image fetched successfully",
        data: image,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch product image",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }

      const image = await productImageService.update(id, req.body);

      return res.status(200).json({
        message: "Product image updated successfully",
        data: image,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to update product image",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }

      await productImageService.delete(id);

      return res.status(200).json({
        message: "Product image deleted successfully",
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to delete product image",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

export default new ProductImageController();
