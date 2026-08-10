import { Request, Response } from "express";
import productVariantService from "../services/productVariant.services.js";

class ProductVariantController {
  async create(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const variant = await productVariantService.create(
        req.body,
        req.user.sub,
      );

      return res.status(201).json({
        message: "Product variant created successfully",
        data: variant,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getByproduct(req: Request, res: Response){
    try {
        const productId = req.params.productId as string

           const variants =
        await productVariantService.getByProduct(
          productId,
        );

      return res.status(200).json({
        message: "Product variants fetched successfully",
        data: variants,
      });
    } catch (error: any) {
         return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getById(
    req: Request,
    res: Response,
  ) {
    try {
      const id = req.params.id as string;

      const variant =
        await productVariantService.getById(id);

      return res.status(200).json({
        message: "Product variant fetched successfully",
        data: variant,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(
    req: Request,
    res: Response,
  ) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const id = req.params.id as string;

      const variant =
        await productVariantService.update(
          id,
          req.user.sub,
          req.body,
        );

      return res.status(200).json({
        message: "Product variant updated successfully",
        data: variant,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }


   async delete(
    req: Request,
    res: Response,
  ) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const id = req.params.id as string;

      const variant =
        await productVariantService.delete(
          id,
          req.user.sub,
        );

      return res.status(200).json({
        message: "Product variant deleted successfully",
        data: variant,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new ProductVariantController();


