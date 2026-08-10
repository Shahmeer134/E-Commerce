import { Request, Response } from "express";
import customerAddressService from "../services/customerAddress.services.js";

class CustomerAddressController{
     async create(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const address = await customerAddressService.create(
        customerId,
        req.body,
      );

      return res.status(201).json({
        message: "Customer address created successfully",
        data: address,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

   async getAll(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const addresses =
        await customerAddressService.getAll(customerId);

      return res.status(200).json({
        message: "Customer addresses fetched successfully",
        data: addresses,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;
      const addressId = req.params.id;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (typeof addressId !== "string") {
        return res.status(400).json({
          message: "Invalid address ID",
        });
      }

      const address =
        await customerAddressService.getById(
          customerId,
          addressId,
        );

      return res.status(200).json({
        message: "Customer address fetched successfully",
        data: address,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;
      const addressId = req.params.id;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (typeof addressId !== "string") {
        return res.status(400).json({
          message: "Invalid address ID",
        });
      }

      const address =
        await customerAddressService.update(
          customerId,
          addressId,
          req.body,
        );

      return res.status(200).json({
        message: "Customer address updated successfully",
        data: address,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

   async delete(req: Request, res: Response) {
    try {
      const customerId = req.user?.sub;
      const addressId = req.params.id;

      if (!customerId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      if (typeof addressId !== "string") {
        return res.status(400).json({
          message: "Invalid address ID",
        });
      }

      const address =
        await customerAddressService.delete(
          customerId,
          addressId,
        );

      return res.status(200).json({
        message: "Customer address deleted successfully",
        data: address,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: error.message,
      });
    }
  }
}

export default new CustomerAddressController();