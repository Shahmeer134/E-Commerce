import { Request, Response } from "express";
import orderService from "../services/order.services.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("OrderController");

class OrderController {
  async create(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const {
        shippingAddress,
        shippingCost,
        tax,
        discount,
      } = req.body;

      if (!shippingAddress) {
        return res.status(400).json({
          message: "Shipping address is required",
        });
      }

      const order = await orderService.create(
        customerId,
        {
          shippingAddress,
          shippingCost,
          tax,
          discount,
        },
      );

      return res.status(201).json({
        message: "Order created successfully",
        data: order,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to create order",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getMyOrders(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const orders =
        await orderService.getMyOrders(customerId);

      return res.status(200).json({
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch orders",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { id } = req.params;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      const order = await orderService.getById(
        id,
        customerId,
      );

      return res.status(200).json({
        message: "Order fetched successfully",
        data: order,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch order",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async cancel(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { id } = req.params;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid order ID",
        });
      }

      const order = await orderService.cancel(
        id,
        customerId,
      );

      return res.status(200).json({
        message: "Order cancelled successfully",
        data: order,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to cancel order",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new OrderController();