import inventoryRepository from "../repositories/product/inventory.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("InventoryService");

class InventoryService {
  async create(data: {
    product: string;
    receivedStock: number;
    availableStock: number;
  }) {
    logger.debug("Creating inventory");

    const product = await productRepository.get({
      _id: data.product,
    });

    if (!product) {
      logger.warn(
        {
          productId: data.product,
        },
        "Product not found",
      );

      throw new Error("Product not found");
    }

    const existingInventory = await inventoryRepository.get({
      product: data.product,
    });

    if (existingInventory) {
      logger.warn(
        {
          productId: data.product,
        },
        "Inventory already exists",
      );

      throw new Error("Inventory already exists for this product");
    }

    if (data.availableStock > data.receivedStock) {
      throw new Error("Available stock cannot be greater than received stock");
    }

    const inventory = await inventoryRepository.create({
      product: data.product,
      receivedStock: data.receivedStock,
      availableStock: data.availableStock,
    });

    logger.info(
      {
        inventoryId: inventory._id,
        productId: data.product,
      },
      "Inventory created successfully",
    );

    return inventory;
  }

  async getAll() {
    logger.debug("Fetching all inventory");

    const inventories = await inventoryRepository.findAll();

    logger.info(
      {
        totalInventory: inventories.length,
      },
      "All inventory fetched successfully",
    );

    return inventories;
  }

  async getByProduct(productId: string) {
    logger.debug(
      {
        productId,
      },
      "Fetching inventory by product",
    );

    const inventory = await inventoryRepository.get({
      product: productId,
    });

    if (!inventory) {
      logger.warn(
        {
          productId,
        },
        "Inventory not found",
      );

      throw new Error("Inventory not found");
    }

    return inventory;
  }

  async getById(id: string) {
    logger.debug(
      {
        inventoryId: id,
      },
      "Fetching inventory",
    );

    const inventory = await inventoryRepository.get({
      _id: id,
    });

    if (!inventory) {
      logger.warn(
        {
          inventoryId: id,
        },
        "Inventory not found",
      );

      throw new Error("Inventory not found");
    }

    return inventory;
  }

  async update(
    id: string,
    data: {
      receivedStock?: number;
      availableStock?: number;
    },
  ) {
    logger.debug(
      {
        inventoryId: id,
      },
      "Updating inventory",
    );

    const inventory = await inventoryRepository.get({
      _id: id,
    });

    if (!inventory) {
      logger.warn(
        {
          inventoryId: id,
        },
        "Inventory not found",
      );

      throw new Error("Inventory not found");
    }

    const receivedStock = data.receivedStock ?? inventory.receivedStock;

    const availableStock = data.availableStock ?? inventory.availableStock;

    if (availableStock > receivedStock) {
      throw new Error("Available stock cannot be greater than received stock");
    }
    const updatedInventory = await inventoryRepository.update(
      {
        _id: id,
      },
      {
        $set: {
          receivedStock,
          availableStock,
        },
      },
      {
        new: true,
      },
    );

    logger.info(
      {
        inventoryId: id,
      },
      "Inventory updated successfully",
    );

    return updatedInventory;
  }

  async delete(id: string) {
    logger.debug(
      {
        inventoryId: id,
      },
      "Deleting inventory",
    );

    const inventory = await inventoryRepository.get({
      _id: id,
    });

    if (!inventory) {
      logger.warn(
        {
          inventoryId: id,
        },
        "Inventory not found",
      );

      throw new Error("Inventory not found");
    }

    await inventoryRepository.delete({
      _id: id,
    });

    logger.info(
      {
        inventoryId: id,
      },
      "Inventory deleted successfully",
    );

    return inventory;
  }
}
export default new InventoryService();
