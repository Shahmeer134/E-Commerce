import orderItemRepository from "../repositories/orders/orderItems.repository.js";
import orderRepository from "../repositories/orders/order.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import shopRepository from "../repositories/shop/shop.repository.js";
import productVariantRepository from "../repositories/product/productVariants.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("OrderItemService");

class OrderItemService {
  // CREATE
  async create(data: {
    order: string;
    product: string;
    shop: string;
    variant?: string;
    quantity: number;
    price: number;
  }) {
    logger.debug(
      {
        orderId: data.order,
        productId: data.product,
      },
      "Creating order item",
    );

    // Check order
    const order = await orderRepository.get({
      _id: data.order,
    });

    if (!order) {
      logger.warn(
        {
          orderId: data.order,
        },
        "Order not found",
      );

      throw new Error("Order not found");
    }

    // Check product
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

    // Check shop
    const shop = await shopRepository.get({
      _id: data.shop,
    });

    if (!shop) {
      logger.warn(
        {
          shopId: data.shop,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }

    // Optional variant
    if (data.variant) {
      const variant = await productVariantRepository.get({
        _id: data.variant,
      });

      if (!variant) {
        logger.warn(
          {
            variantId: data.variant,
          },
          "Product variant not found",
        );

        throw new Error("Product variant not found");
      }

      // Make sure variant belongs to product
      if (variant.product.toString() !== data.product) {
        logger.warn(
          {
            variantId: data.variant,
            productId: data.product,
          },
          "Product variant does not belong to product",
        );

        throw new Error("Product variant does not belong to product");
      }
    }

    if (data.quantity < 1) {
      logger.warn(
        {
          quantity: data.quantity,
        },
        "Invalid order item quantity",
      );

      throw new Error("Quantity must be at least 1");
    }

    if (data.price < 0) {
      logger.warn(
        {
          price: data.price,
        },
        "Invalid order item price",
      );

      throw new Error("Price cannot be negative");
    }

    const subtotal = data.quantity * data.price;

    const orderItem = await orderItemRepository.create({
      order: data.order,
      product: data.product,
      shop: data.shop,
      variant: data.variant,
      quantity: data.quantity,
      price: data.price,
      subtotal,
    });

    logger.info(
      {
        orderItemId: orderItem._id,
        orderId: data.order,
      },
      "Order item created successfully",
    );

    return orderItem;
  }

  // GET ALL
  async getAll() {
    logger.debug("Fetching all order items");

    const orderItems = await orderItemRepository.findAll();

    logger.info(
      {
        totalOrderItems: orderItems.length,
      },
      "All order items fetched successfully",
    );

    return orderItems;
  }

  // GET BY ID
  async getById(id: string) {
    logger.debug(
      {
        orderItemId: id,
      },
      "Fetching order item",
    );

    const orderItem = await orderItemRepository.get({
      _id: id,
    });

    if (!orderItem) {
      logger.warn(
        {
          orderItemId: id,
        },
        "Order item not found",
      );

      throw new Error("Order item not found");
    }

    return orderItem;
  }

  // GET BY ORDER
  async getByOrder(orderId: string) {
    logger.debug(
      {
        orderId,
      },
      "Fetching order items",
    );

    const order = await orderRepository.get({
      _id: orderId,
    });

    if (!order) {
      logger.warn(
        {
          orderId,
        },
        "Order not found",
      );

      throw new Error("Order not found");
    }

    const orderItems = await orderItemRepository.findAll({
      order: orderId,
    });

    logger.info(
      {
        orderId,
        totalItems: orderItems.length,
      },
      "Order items fetched successfully",
    );

    return orderItems;
  }

  // UPDATE
  async update(
    id: string,
    data: {
      quantity?: number;
      price?: number;
    },
  ) {
    logger.debug(
      {
        orderItemId: id,
      },
      "Updating order item",
    );

    const existingItem = await orderItemRepository.get({
      _id: id,
    });

    if (!existingItem) {
      logger.warn(
        {
          orderItemId: id,
        },
        "Order item not found",
      );

      throw new Error("Order item not found");
    }

    if (data.quantity !== undefined && data.quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    if (data.price !== undefined && data.price < 0) {
      throw new Error("Price cannot be negative");
    }

    const quantity = data.quantity ?? existingItem.quantity;
    const price = data.price ?? existingItem.price;

    const subtotal = quantity * price;

    const updatedItem = await orderItemRepository.update(
      {
        _id: id,
      },
      {
        $set: {
          ...data,
          subtotal,
        },
      },
      {
        new: true,
      },
    );

    logger.info(
      {
        orderItemId: id,
      },
      "Order item updated successfully",
    );

    return updatedItem;
  }

  // DELETE
  async delete(id: string) {
    logger.debug(
      {
        orderItemId: id,
      },
      "Deleting order item",
    );

    const orderItem = await orderItemRepository.get({
      _id: id,
    });

    if (!orderItem) {
      logger.warn(
        {
          orderItemId: id,
        },
        "Order item not found",
      );

      throw new Error("Order item not found");
    }

    await orderItemRepository.delete({
      _id: id,
    });

    logger.info(
      {
        orderItemId: id,
      },
      "Order item deleted successfully",
    );

    return orderItem;
  }
}

export default new OrderItemService();