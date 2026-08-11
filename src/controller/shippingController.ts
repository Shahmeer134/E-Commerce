import { Request, Response } from "express";
import shippingService from "../services/shipping.services.js";

class ShippingController {
  async create(req: Request, res: Response) {
    try {
      const shipping = await shippingService.create(req.body);

      return res.status(201).json({
        message: "Shipping created successfully",
        data: shipping,
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

      const shipping = await shippingService.getById(id as string);

      return res.status(200).json({
        message: "Shipping fetched successfully",
        data: shipping,
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

      const shipping = await shippingService.getByOrder(
        orderId as string,
      );

      return res.status(200).json({
        message: "Shipping fetched successfully",
        data: shipping,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const shipping = await shippingService.getAll();

      return res.status(200).json({
        message: "Shipping records fetched successfully",
        data: shipping,
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

      const shipping = await shippingService.update(
        id as string,
        req.body,
      );

      return res.status(200).json({
        message: "Shipping updated successfully",
        data: shipping,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { shippingStatus } = req.body;

      const shipping = await shippingService.updateStatus(
        id as string,
        shippingStatus,
      );

      return res.status(200).json({
        message: "Shipping status updated successfully",
        data: shipping,
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

      const shipping = await shippingService.delete(id as string);

      return res.status(200).json({
        message: "Shipping deleted successfully",
        data: shipping,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

export default new ShippingController();