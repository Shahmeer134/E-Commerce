import { Request, Response } from "express";
import paymentService from "../services/payment.services.js";

class PaymentController {
  async create(req: Request, res: Response) {
    try {
      const payment = await paymentService.create(req.body);

      return res.status(201).json({
        message: "Payment created successfully",
        data: payment,
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

      const payment = await paymentService.getById(id as string);

      return res.status(200).json({
        message: "Payment fetched successfully",
        data: payment,
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

      const payment = await paymentService.getByOrder(
        orderId as string,
      );

      return res.status(200).json({
        message: "Payment fetched successfully",
        data: payment,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const payments = await paymentService.getAll();

      return res.status(200).json({
        message: "Payments fetched successfully",
        data: payments,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const payment = await paymentService.updateStatus(
        id as string,
        req.body,
      );

      return res.status(200).json({
        message: "Payment status updated successfully",
        data: payment,
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

      const payment = await paymentService.delete(id as string);

      return res.status(200).json({
        message: "Payment deleted successfully",
        data: payment,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

export default new PaymentController();