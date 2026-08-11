import { Request, Response } from "express";
import orderItemService from "../services/orderItem.services.js";

class OrderItemController {
  async create(req: Request, res: Response) {
    try {
      const orderItem = await orderItemService.create(req.body);

      return res.status(201).json({
        message: "Order item created successfully",
        data: orderItem,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const orderItems = await orderItemService.getAll();

      return res.status(200).json({
        message: "Order items fetched successfully",
        data: orderItems,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const orderItem = await orderItemService.getById(id as string);

      return res.status(200).json({
        message: "Order item fetched successfully",
        data: orderItem,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async getByOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.params;

      const orderItems = await orderItemService.getByOrder(
        orderId as string,
      );

      return res.status(200).json({
        message: "Order items fetched successfully",
        data: orderItems,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const orderItem = await orderItemService.update(
        id as string,
        req.body,
      );

      return res.status(200).json({
        message: "Order item updated successfully",
        data: orderItem,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const orderItem = await orderItemService.delete(id as string);

      return res.status(200).json({
        message: "Order item deleted successfully",
        data: orderItem,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

export default new OrderItemController();