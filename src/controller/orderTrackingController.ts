import { Request, Response } from "express";
import orderTrackingService from "../services/orderTracking.services.js";

class OrderTrackingController {
  async create(req: Request, res: Response) {
    try {
      const tracking = await orderTrackingService.create(req.body);

      return res.status(201).json({
        message: "Order tracking created successfully",
        data: tracking,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const tracking = await orderTrackingService.getById(
        id as string,
      );

      return res.status(200).json({
        message: "Order tracking fetched successfully",
        data: tracking,
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

      const tracking = await orderTrackingService.getByOrder(
        orderId as string,
      );

      return res.status(200).json({
        message: "Order tracking history fetched successfully",
        data: tracking,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const tracking = await orderTrackingService.getAll();

      return res.status(200).json({
        message: "Order tracking records fetched successfully",
        data: tracking,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const tracking = await orderTrackingService.update(
        id as string,
        req.body,
      );

      return res.status(200).json({
        message: "Order tracking updated successfully",
        data: tracking,
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

      const tracking = await orderTrackingService.delete(
        id as string,
      );

      return res.status(200).json({
        message: "Order tracking deleted successfully",
        data: tracking,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

export default new OrderTrackingController();