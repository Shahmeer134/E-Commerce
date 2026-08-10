import { Request, Response } from "express";
import cartService from "../services/cart.services.js";

class CartController {
  async addItem(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const item = await cartService.addItem(userId, req.body);

      return res.status(201).json({
        message: "Item added to cart successfully",
        data: item,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const cart = await cartService.getCart(userId);

      return res.status(200).json({
        message: "Cart fetched successfully",
        data: cart,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;
      const itemId = req.params.id as string;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const item = await cartService.updateItem(
        userId,
        itemId,
        req.body.quantity,
      );

      return res.status(200).json({
        message: "Cart item updated successfully",
        data: item,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;
      const itemId = req.params.id as string;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const item = await cartService.removeItem(userId, itemId);

      return res.status(200).json({
        message: "Cart item removed successfully",
        data: item,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const result = await cartService.clearCart(userId);

      return res.status(200).json({
        message: "Cart cleared successfully",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new CartController();
