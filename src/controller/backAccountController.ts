import { Request, Response } from "express";
import bankAccountService from "../services/backAccount.services.js";
import shopRepository from "../repositories/shop/shop.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("BankAccountController");

class BankAccountController {
 
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { shopId, bankName, accountTitle, accountNumber, iban } = req.body;

      if (!shopId || !bankName || !accountTitle || !accountNumber || !iban) {
        return res.status(400).json({
          message: "All bank account fields are required",
        });
      }

      // Make sure shop belongs to logged-in admin
      const shop = await shopRepository.get({
        _id: shopId,
        owner: userId,
      });

      if (!shop) {
        logger.warn(
          {
            shopId,
            userId,
          },
          "Shop does not belong to current user",
        );

        return res.status(403).json({
          message: "You don't have permission to manage this shop",
        });
      }

      const bankAccount = await bankAccountService.create(shopId, {
        bankName,
        accountTitle,
        accountNumber,
        iban,
      });

      return res.status(201).json({
        message: "Bank account created successfully",
        data: bankAccount,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to create bank account",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async getByShop(req: Request, res: Response) {
    try {
      const userId = req.user?.sub;

      if (!userId) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const { shopId } = req.params;

      const shop = await shopRepository.get({
        _id: shopId,
        owner: userId,
      });

      if (!shop) {
        return res.status(403).json({
          message: "You don't have permission to access this shop",
        });
      }

      if (!shopId || Array.isArray(shopId)) {
        return res.status(400).json({
          message: "Invalid shop ID",
        });
      }

      const bankAccount = await bankAccountService.getByShop(shopId);

      return res.status(200).json({
        message: "Bank account fetched successfully",
        data: bankAccount,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch bank account",
      );

      return res.status(404).json({
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
      const bankAccount = await bankAccountService.getById(id);

      return res.status(200).json({
        message: "Bank account fetched successfully",
        data: bankAccount,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to fetch bank account",
      );

      return res.status(404).json({
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

      const { shopId } = req.params;

      const shop = await shopRepository.get({
        _id: shopId,
        owner: userId,
      });

      if (!shop) {
        return res.status(403).json({
          message: "You don't have permission to manage this shop",
        });
      }

      if (!shopId || Array.isArray(shopId)) {
        return res.status(400).json({
          message: "Invalid shop ID",
        });
      }

      const updatedAccount = await bankAccountService.update(shopId, req.body);

      return res.status(200).json({
        message: "Bank account updated successfully",
        data: updatedAccount,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to update bank account",
      );

      return res.status(400).json({
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

      const { shopId } = req.params;

      const shop = await shopRepository.get({
        _id: shopId,
        owner: userId,
      });

      if (!shop) {
        return res.status(403).json({
          message: "You don't have permission to manage this shop",
        });
      }

      if (!shopId || Array.isArray(shopId)) {
        return res.status(400).json({
          message: "Invalid shop ID",
        });
      }

      const deletedAccount = await bankAccountService.delete(shopId);

      return res.status(200).json({
        message: "Bank account deleted successfully",
        data: deletedAccount,
      });
    } catch (error: any) {
      logger.error(
        {
          error: error.message,
        },
        "Failed to delete bank account",
      );

      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default new BankAccountController();
