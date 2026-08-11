import orderTrackingRepository from "../repositories/orders/orderTracking.repository.js";
import shippingRepository from "../repositories/shipping/shipping.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("OrderTrackingService");

class OrderTrackingService {
  async create(data: {
    order: string;
    status: string;
    location: string;
  }) {
    logger.debug(
      {
        orderId: data.order,
        status: data.status,
      },
      "Creating order tracking record",
    );

    const shipping = await shippingRepository.get({
      order: data.order,
    });

    if (!shipping) {
      logger.warn(
        {
          orderId: data.order,
        },
        "Shipping record not found",
      );

      throw new Error("Shipping record not found for this order");
    }

    const tracking = await orderTrackingRepository.create({
      order: data.order,
      status: data.status,
      location: data.location,
    });

    logger.info(
      {
        trackingId: tracking._id,
        orderId: data.order,
      },
      "Order tracking created successfully",
    );

    return tracking;
  }

  async getById(id: string) {
    logger.debug(
      {
        trackingId: id,
      },
      "Fetching order tracking",
    );

    const tracking = await orderTrackingRepository.get({
      _id: id,
    });

    if (!tracking) {
      logger.warn(
        {
          trackingId: id,
        },
        "Order tracking not found",
      );

      throw new Error("Order tracking not found");
    }

    logger.info(
      {
        trackingId: id,
      },
      "Order tracking fetched successfully",
    );

    return tracking;
  }

  async getByOrder(orderId: string) {
    logger.debug(
      {
        orderId,
      },
      "Fetching order tracking history",
    );

    const tracking = await orderTrackingRepository.findAll(
      {
        order: orderId,
      },
      undefined,
      {
        sort: {
          createdAt: -1,
        },
      },
    );

    logger.info(
      {
        orderId,
        totalTrackingRecords: tracking.length,
      },
      "Order tracking history fetched successfully",
    );

    return tracking;
  }

  async getAll() {
    logger.debug("Fetching all order tracking records");

    const tracking = await orderTrackingRepository.findAll();

    logger.info(
      {
        totalTrackingRecords: tracking.length,
      },
      "All order tracking records fetched successfully",
    );

    return tracking;
  }

  async update(
    id: string,
    data: {
      status?: string;
      location?: string;
    },
  ) {
    logger.debug(
      {
        trackingId: id,
      },
      "Updating order tracking",
    );

    const existingTracking = await orderTrackingRepository.get({
      _id: id,
    });

    if (!existingTracking) {
      logger.warn(
        {
          trackingId: id,
        },
        "Order tracking not found",
      );

      throw new Error("Order tracking not found");
    }

    const updatedTracking = await orderTrackingRepository.update(
      {
        _id: id,
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
        trackingId: id,
      },
      "Order tracking updated successfully",
    );

    return updatedTracking;
  }

  async delete(id: string) {
    logger.debug(
      {
        trackingId: id,
      },
      "Deleting order tracking",
    );

    const tracking = await orderTrackingRepository.get({
      _id: id,
    });

    if (!tracking) {
      logger.warn(
        {
          trackingId: id,
        },
        "Order tracking not found",
      );

      throw new Error("Order tracking not found");
    }

    await orderTrackingRepository.delete({
      _id: id,
    });

    logger.info(
      {
        trackingId: id,
      },
      "Order tracking deleted successfully",
    );

    return tracking;
  }
}

export default new OrderTrackingService();