import orderRepository from "../repositories/orders/order.repository.js";
import orderItemRepository from "../repositories/orders/orderItems.repository.js";
import cartRepository from "../repositories/cart/cart.repository.js";
import cartItemRepository from "../repositories/cart/cartItems.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import customerAddressRepository from "../repositories/customer/customerAddress.repository.js";
import customerRepository from "../repositories/customer/customer.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("OrderService");

class OrderService {
  private async getCustomer(userId: string) {
    const customer = await customerRepository.get({
      user: userId,
    });

    if (!customer) {
      logger.warn({ userId }, "Customer not found");

      throw new Error("Customer not found");
    }

    return customer;
  }

  // CREATE ORDER
  async create(
    userId: string,
    data: {
      shippingAddress: string;
      shippingCost?: number;
      tax?: number;
      discount?: number;
    },
  ) {
    logger.debug(
      {
        userId,
      },
      "Creating order",
    );

    const customer = await this.getCustomer(userId);
    const customerId = customer._id;

    // 1. Check shipping address
    const address = await customerAddressRepository.get({
      _id: data.shippingAddress,
      customerId,
    });

    if (!address) {
      logger.warn(
        {
          customerId,
          shippingAddress: data.shippingAddress,
        },
        "Shipping address not found",
      );

      throw new Error("Shipping address not found");
    }

    // 2. Find customer's cart
    const cart = await cartRepository.get({
      customerId,
    });

    if (!cart) {
      logger.warn(
        {
          customerId,
        },
        "Cart not found",
      );

      throw new Error("Cart not found");
    }

    // 3. Get cart items
    const cartItems = await cartItemRepository.findAll({
      cart: cart._id,
    });

    if (cartItems.length === 0) {
      logger.warn(
        {
          customerId,
          cartId: cart._id,
        },
        "Cannot create order from empty cart",
      );

      throw new Error("Cart is empty");
    }

    let subTotal = 0;

    const orderItemsData: {
      product: any;
      shop: any;
      variant?: any;
      quantity: number;
      price: number;
      subtotal: number;
    }[] = [];

    // 4. Validate products and calculate subtotal
    for (const item of cartItems) {
      const product = await productRepository.get({
        _id: item.product,
      });

      if (!product) {
        logger.warn(
          {
            productId: item.product,
          },
          "Product not found",
        );

        throw new Error(`Product ${item.product} not found`);
      }

      // 5. Check stock
      if (product.stock < item.quantity) {
        logger.warn(
          {
            productId: product._id,
            requestedQuantity: item.quantity,
            availableStock: product.stock,
          },
          "Insufficient product stock",
        );

        throw new Error(`Insufficient stock for product ${product.title}`);
      }

      const price = item.price;
      const itemSubtotal = price * item.quantity;

      subTotal += itemSubtotal;

      orderItemsData.push({
        product: product._id,
        shop: product.shop,
        variant: item.variant,
        quantity: item.quantity,
        price,
        subtotal: itemSubtotal,
      });
    }

    // 6. Calculate order total
    const shippingCost = data.shippingCost ?? 0;
    const tax = data.tax ?? 0;
    const discount = data.discount ?? 0;

    const totalAmount = subTotal + shippingCost + tax - discount;

    // 7. Create order
    const order = await orderRepository.create({
      customer: customerId,
      shippingAddress: data.shippingAddress,

      subTotal,
      shippingCost,
      tax,
      discount,
      totalAmount,

      paymentStatus: "pending",
      orderStatus: "pending",
    });

    // 8. Create order items
    for (const item of orderItemsData) {
      await orderItemRepository.create({
        order: order._id,
        product: item.product,
        shop: item.shop,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      });
    }

    // 9. Clear cart after successful order
    await cartItemRepository.deleteMany({
      cart: cart._id,
    });

    logger.info(
      {
        orderId: order._id,
        customerId,
        totalAmount,
      },
      "Order created successfully",
    );

    return order;
  }

  // GET MY ORDERS
  async getMyOrders(userId: string) {
    logger.debug(
      {
        userId,
      },
      "Fetching customer orders",
    );

    const customer = await this.getCustomer(userId);

    const orders = await orderRepository.findAll({
      customer: customer._id,
    });

    logger.info(
      {
        customerId: customer._id,
        totalOrders: orders.length,
      },
      "Customer orders fetched successfully",
    );

    return orders;
  }

  // GET ORDER BY ID
  async getById(id: string, userId: string) {
    logger.debug(
      {
        orderId: id,
        userId,
      },
      "Fetching order",
    );

    const customer = await this.getCustomer(userId);

    const order = await orderRepository.get({
      _id: id,
      customer: customer._id,
    });

    if (!order) {
      logger.warn(
        {
          orderId: id,
          customerId: customer._id,
        },
        "Order not found",
      );

      throw new Error("Order not found");
    }

    return order;
  }

  // CANCEL ORDER
  async cancel(id: string, userId: string) {
    logger.debug(
      {
        orderId: id,
        userId,
      },
      "Cancelling order",
    );

    const customer = await this.getCustomer(userId);

    const order = await orderRepository.get({
      _id: id,
      customer: customer._id,
    });

    if (!order) {
      logger.warn(
        {
          orderId: id,
          customerId: customer._id,
        },
        "Order not found",
      );

      throw new Error("Order not found");
    }

    // Only pending orders can be cancelled
    if (order.orderStatus !== "pending") {
      logger.warn(
        {
          orderId: id,
          orderStatus: order.orderStatus,
        },
        "Order cannot be cancelled",
      );

      throw new Error("Only pending orders can be cancelled");
    }

    const updatedOrder = await orderRepository.update(
      {
        _id: id,
        customer: customer._id,
      },
      {
        $set: {
          orderStatus: "cancelled",
        },
      },
      {
        new: true,
      },
    );

    logger.info(
      {
        orderId: id,
        customerId: customer._id,
      },
      "Order cancelled successfully",
    );

    return updatedOrder;
  }
}

export default new OrderService();
