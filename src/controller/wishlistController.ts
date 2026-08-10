import { Request, Response } from "express";
import wishlistService from "../services/wishlist.services.js";
import customerRepository from "../repositories/customer/customer.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("WishlistController");

class WishlistController {
  async add(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerRepository.get({
        user: userId,
      });

      if (!customer) {
        return res.status(404).json({
          message: "Customer profile not found",
        });
      }

      const { product } = req.body;

      if (!product) {
        return res.status(400).json({
          message: "Product is required",
        });
      }

      const wishlist = await wishlistService.add(
        customer._id.toString(),
        product,
      );

      return res.status(201).json({
        message: "Product added to wishlist successfully",
        data: wishlist,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to add product to wishlist",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  /**
   * Get all wishlist items
   */
  async getAll(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerRepository.get({
        user: userId,
      });

      if (!customer) {
        return res.status(404).json({
          message: "Customer profile not found",
        });
      }

      const wishlist = await wishlistService.getAll(customer._id.toString());

      return res.status(200).json({
        message: "Wishlist fetched successfully",
        data: wishlist,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch wishlist",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  /**
   * Get one wishlist item
   */
  async getById(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerRepository.get({
        user: userId,
      });

      if (!customer) {
        return res.status(404).json({
          message: "Customer profile not found",
        });
      }

      const { id } = req.params;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid customer ID",
        });
      }
      const wishlist = await wishlistService.getById(
        customer._id.toString(),
        id,
      );

      return res.status(200).json({
        message: "Wishlist item fetched successfully",
        data: wishlist,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch wishlist item",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }

  /**
   * Remove wishlist item
   */
  async remove(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerRepository.get({
        user: userId,
      });

      if (!customer) {
        return res.status(404).json({
          message: "Customer profile not found",
        });
      }

      const { id } = req.params;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid customer ID",
        });
      }
      const wishlist = await wishlistService.remove(
        customer._id.toString(),
        id,
      );

      return res.status(200).json({
        message: "Product removed from wishlist successfully",
        data: wishlist,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to remove wishlist item",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async removeByProduct(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerRepository.get({
        user: userId,
      });

      if (!customer) {
        return res.status(404).json({
          message: "Customer profile not found",
        });
      }

      const { productId } = req.params;
       if (!productId || Array.isArray(productId)) {
        return res.status(400).json({
          message: "Invalid customer ID",
        });
      }
      const wishlist = await wishlistService.removeByProduct(
        customer._id.toString(),
        productId,
      );

      return res.status(200).json({
        message: "Product removed from wishlist successfully",
        data: wishlist,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to remove product from wishlist",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new WishlistController();
