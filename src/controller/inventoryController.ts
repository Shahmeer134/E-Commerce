import { Request, Response } from "express";
import inventoryService from "../services/inventory.services.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("InventoryController");

class InventoryController {
  async create(req: Request, res: Response) {
    try {
      const inventory = await inventoryService.create(req.body);

      return res.status(201).json({
        message: "Inventory created successfully",
        data: inventory,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to create inventory",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getAll(_req: Request, res: Response) {
    try {
      const inventories = await inventoryService.getAll();

      return res.status(200).json({
        message: "Inventory fetched successfully",
        data: inventories,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch inventory",
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  async getByProduct(req: Request, res: Response) {
    try {
      const { productId } = req.params;

      if (typeof productId !== "string") {
        return res.status(400).json({
          message: "Invalid product ID",
        });
      }

      const inventory = await inventoryService.getByProduct(productId);

      return res.status(200).json({
        message: "Inventory fetched successfully",
        data: inventory,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch inventory",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid inventory ID",
        });
      }

      const inventory = await inventoryService.getById(id);

      return res.status(200).json({
        message: "Inventory fetched successfully",
        data: inventory,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch inventory",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid inventory ID",
        });
      }

      const inventory = await inventoryService.update(id, req.body);

      return res.status(200).json({
        message: "Inventory updated successfully",
        data: inventory,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to update inventory",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (typeof id !== "string") {
        return res.status(400).json({
          message: "Invalid inventory ID",
        });
      }

      await inventoryService.delete(id);

      return res.status(200).json({
        message: "Inventory deleted successfully",
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to delete inventory",
      );

      return res.status(404).json({
        message: error.message,
      });
    }
  }
}
export default new InventoryController();
