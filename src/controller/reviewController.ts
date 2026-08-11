import { Request, Response } from "express";
import reviewService from "../services/review.services.js";

class ReviewController {
  // POST /reviews
  async create(req: Request, res: Response) {
    try {
      const review = await reviewService.create(req.body);

      return res.status(201).json({
        message: "Review created successfully",
        data: review,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // GET /reviews
  async getAll(_req: Request, res: Response) {
    try {
      const reviews = await reviewService.getAll();

      return res.status(200).json({
        message: "Reviews fetched successfully",
        data: reviews,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // GET /reviews/:id
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const review = await reviewService.getById(id as string);

      return res.status(200).json({
        message: "Review fetched successfully",
        data: review,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  // GET /reviews/product/:productId
  async getByProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      const reviews = await reviewService.getByProduct(
        productId as string,
      );

      return res.status(200).json({
        message: "Product reviews fetched successfully",
        data: reviews,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  // GET /reviews/customer/:customerId
  async getByCustomer(req: Request, res: Response) {
    try {
      const { customerId } = req.params;

      const reviews = await reviewService.getByCustomer(
        customerId as string,
      );

      return res.status(200).json({
        message: "Customer reviews fetched successfully",
        data: reviews,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  // PATCH /reviews/:id
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const review = await reviewService.update(
        id as string,
        customerId,
        req.body,
      );

      return res.status(200).json({
        message: "Review updated successfully",
        data: review,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  // DELETE /reviews/:id
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const review = await reviewService.delete(
        id as string,
        customerId,
      );

      return res.status(200).json({
        message: "Review deleted successfully",
        data: review,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new ReviewController();