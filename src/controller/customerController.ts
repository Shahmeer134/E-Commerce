import { Request, Response } from "express";
import customerService from "../services/customer.services.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("CustomerController");

class CustomerController {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { gender, dateOfBirth } = req.body;

      if (!gender || !dateOfBirth) {
        return res.status(400).json({
          message: "Gender and dateOfBirth are required",
        });
      }

      const customer = await customerService.create(userId, {
        gender,
        dateOfBirth,
      });

      return res.status(201).json({
        message: "Customer profile created successfully",
        data: customer,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to create customer profile",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getMyProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerService.getMyProfile(userId);

      return res.status(200).json({
        message: "Customer profile fetched successfully",
        data: customer,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch customer profile",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id || Array.isArray(id)) {
        return res.status(400).json({
          message: "Invalid customer ID",
        });
      }

      const customer = await customerService.getById(id);

      return res.status(200).json({
        message: "Customer fetched successfully",
        data: customer,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch customer",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const customers = await customerService.getAll();

      return res.status(200).json({
        message: "Customers fetched successfully",
        data: customers,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch customers",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { gender, dateOfBirth } = req.body;

      const customer = await customerService.update(userId, {
        gender,
        dateOfBirth,
      });

      return res.status(200).json({
        message: "Customer profile updated successfully",
        data: customer,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to update customer profile",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const customer = await customerService.delete(userId);

      return res.status(200).json({
        message: "Customer profile deleted successfully",
        data: customer,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to delete customer profile",
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new CustomerController();
