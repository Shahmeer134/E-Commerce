import bankAccountRepository from "../repositories/user/backAccount.repository.js";
import shopRepository from "../repositories/shop/shop.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("BankAccountService");

class BankAccountService {
  /**
   * Create bank account for a shop
   */
  async create(
    shopId: string,
    data: {
      bankName: string;
      accountTitle: string;
      accountNumber: string;
      iban: string;
    },
  ) {
    logger.debug(
      {
        shopId,
      },
      "Creating bank account",
    );

    // Check shop
    const shop = await shopRepository.get({
      _id: shopId,
    });

    if (!shop) {
      logger.warn(
        {
          shopId,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }

    // One bank account per shop
    const existingAccount = await bankAccountRepository.get({
      shopId,
    });

    if (existingAccount) {
      logger.warn(
        {
          shopId,
        },
        "Bank account already exists for this shop",
      );

      throw new Error(
        "Bank account already exists for this shop",
      );
    }

    const bankAccount = await bankAccountRepository.create({
      shopId,
      bankName: data.bankName,
      accountTitle: data.accountTitle,
      accountNumber: data.accountNumber,
      iban: data.iban,
    });

    logger.info(
      {
        bankAccountId: bankAccount._id,
        shopId,
      },
      "Bank account created successfully",
    );

    return bankAccount;
  }

  /**
   * Get bank account of a shop
   */
  async getByShop(shopId: string) {
    logger.debug(
      {
        shopId,
      },
      "Fetching shop bank account",
    );

    const shop = await shopRepository.get({
      _id: shopId,
    });

    if (!shop) {
      logger.warn(
        {
          shopId,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }

    const bankAccount = await bankAccountRepository.get({
      shopId,
    });

    if (!bankAccount) {
      logger.warn(
        {
          shopId,
        },
        "Bank account not found",
      );

      throw new Error("Bank account not found");
    }

    logger.info(
      {
        shopId,
        bankAccountId: bankAccount._id,
      },
      "Bank account fetched successfully",
    );

    return bankAccount;
  }

  /**
   * Get bank account by ID
   */
  async getById(id: string) {
    logger.debug(
      {
        bankAccountId: id,
      },
      "Fetching bank account",
    );

    const bankAccount = await bankAccountRepository.get({
      _id: id,
    });

    if (!bankAccount) {
      logger.warn(
        {
          bankAccountId: id,
        },
        "Bank account not found",
      );

      throw new Error("Bank account not found");
    }

    return bankAccount;
  }

  /**
   * Update bank account
   */
  async update(
    shopId: string,
    data: {
      bankName?: string;
      accountTitle?: string;
      accountNumber?: string;
      iban?: string;
    },
  ) {
    logger.debug(
      {
        shopId,
      },
      "Updating bank account",
    );

    const existingAccount = await bankAccountRepository.get({
      shopId,
    });

    if (!existingAccount) {
      logger.warn(
        {
          shopId,
        },
        "Bank account not found",
      );

      throw new Error("Bank account not found");
    }

    const updatedAccount =
      await bankAccountRepository.update(
        {
          shopId,
        },
        {
          $set: data,
        },
        {
          new: true,
        },
      );

    logger.info(
      {
        shopId,
        bankAccountId: existingAccount._id,
      },
      "Bank account updated successfully",
    );

    return updatedAccount;
  }

  /**
   * Delete bank account
   */
  async delete(shopId: string) {
    logger.debug(
      {
        shopId,
      },
      "Deleting bank account",
    );

    const existingAccount = await bankAccountRepository.get({
      shopId,
    });

    if (!existingAccount) {
      logger.warn(
        {
          shopId,
        },
        "Bank account not found",
      );

      throw new Error("Bank account not found");
    }

    await bankAccountRepository.delete({
      shopId,
    });

    logger.info(
      {
        shopId,
        bankAccountId: existingAccount._id,
      },
      "Bank account deleted successfully",
    );

    return existingAccount;
  }
}

export default new BankAccountService();