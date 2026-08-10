import { Request, Response } from "express";
import productService from "../services/product.services.js";

class ProductController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const product = await productService.create(req.body, req.user.sub);

      return res.status(201).json({
        message: "Product created successfully",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const products = await productService.getAll();

      return res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const product = await productService.getById(req.params.id as string);

      return res.status(200).json({
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getMyProducts(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const products = await productService.getMyProducts(req.user.sub);

      return res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const product = await productService.update(
        req.params.id as string,
        req.user.sub,
        req.body,
      );

      return res.status(200).json({
        message: "Product updated successfully",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const product = await productService.delete(
        req.params.id as string,
        req.user.sub,
      );

      return res.status(200).json({
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new ProductController();
