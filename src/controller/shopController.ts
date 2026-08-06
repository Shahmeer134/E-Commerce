import { Request, Response } from "express";
import shopService from "../services/shop.services.js";

class ShopController {
  // POST
  async create(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const shop = await shopService.create(req.body, req.user.sub);

      return res.status(201).json({
        message: "Shop created Successfully",
        data: shop,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  //   GET /Shop/me

  async get(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const shop = await shopService.getMyShop(req.user.sub);

      return res.status(200).json({
        message: "Shop fetched Successfully",
        data: shop,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  // GET /shops
  async getAll(_req: Request, res: Response) {
    try {
      const shops = await shopService.getAll();

      return res.status(200).json({
        message: "Shops fetched successfully",
        data: shops,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // GET /shops/:id

  async getShopById(req: Request, res: Response) {
    try {
      const shop = await shopService.getShopById(req.params.id as string);
      return res.status(200).json({
        message: "Shop fetched successfully",
        data: shop,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // PATCH /shops/:id
  async update(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const shop = await shopService.update(
        req.params.id as string,
        req.user.sub,
        req.body,
      );

      return res.status(200).json({
        message: "Shop updated successfully",
        data: shop,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  }

  // DELETE /shops/:id
  async delete(req: Request, res: Response) {
    try {
      if (!req.user?.sub) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      const shop = await shopService.delete(
        req.params.id as string,
        req.user.sub,
      );

      return res.status(200).json({
        message: "Shop deleted successfully",
        data: shop,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new ShopController();
