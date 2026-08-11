import shippingRepository from "../repositories/shipping/shipping.repository.js";
import { Logger } from "../utils/logger.js";
import { SHIPPING_STATUS } from "../constant/enums.js";

const logger = new Logger("ShippingService");

class ShippingService {
  async create(data: {
    order: string;
    courierName: string;
    trackingNumber?: string;
    estimatedDelivery?: Date;
  }) {
    logger.debug(
      {
        orderId: data.order,
      },
      "Creating shipping record",
    );

    // One shipping record per order
    const existingShipping = await shippingRepository.get({
      order: data.order,
    });

    if (existingShipping) {
      logger.warn(
        {
          orderId: data.order,
        },
        "Shipping already exists for this order",
      );

      throw new Error("Shipping already exists for this order");
    }

    const shipping = await shippingRepository.create({
      order: data.order,
      courierName: data.courierName,
      trackingNumber: data.trackingNumber,
      estimatedDelivery: data.estimatedDelivery,
      shippingStatus: SHIPPING_STATUS.PENDING,
    });

    logger.info(
      {
        shippingId: shipping._id,
        orderId: data.order,
      },
      "Shipping created successfully",
    );

    return shipping;
  }

  async getById(id: string) {
    logger.debug(
      {
        shippingId: id,
      },
      "Fetching shipping",
    );

    const shipping = await shippingRepository.get({
      _id: id,
    });

    if (!shipping) {
      logger.warn(
        {
          shippingId: id,
        },
        "Shipping not found",
      );

      throw new Error("Shipping not found");
    }

    logger.info(
      {
        shippingId: id,
      },
      "Shipping fetched successfully",
    );

    return shipping;
  }

  async getByOrder(orderId: string) {
    logger.debug(
      {
        orderId,
      },
      "Fetching shipping by order",
    );

    const shipping = await shippingRepository.get({
      order: orderId,
    });

    if (!shipping) {
      logger.warn(
        {
          orderId,
        },
        "Shipping not found for order",
      );

      throw new Error("Shipping not found for this order");
    }

    logger.info(
      {
        shippingId: shipping._id,
        orderId,
      },
      "Shipping fetched successfully",
    );

    return shipping;
  }

  async getAll() {
    logger.debug("Fetching all shipping records");

    const shipping = await shippingRepository.findAll();

    logger.info(
      {
        totalShippingRecords: shipping.length,
      },
      "All shipping records fetched successfully",
    );

    return shipping;
  }

  async update(
    id: string,
    data: {
      courierName?: string;
      trackingNumber?: string;
      shippingStatus?: string;
      estimatedDelivery?: Date;
    },
  ) {
    logger.debug(
      {
        shippingId: id,
      },
      "Updating shipping",
    );

    const existingShipping = await shippingRepository.get({
      _id: id,
    });

    if (!existingShipping) {
      logger.warn(
        {
          shippingId: id,
        },
        "Shipping not found",
      );

      throw new Error("Shipping not found");
    }

    const updatedShipping = await shippingRepository.update(
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
        shippingId: id,
      },
      "Shipping updated successfully",
    );

    return updatedShipping;
  }

  async updateStatus(id: string, shippingStatus: string) {
    logger.debug(
      {
        shippingId: id,
        shippingStatus,
      },
      "Updating shipping status",
    );

    const existingShipping = await shippingRepository.get({
      _id: id,
    });

    if (!existingShipping) {
      logger.warn(
        {
          shippingId: id,
        },
        "Shipping not found",
      );

      throw new Error("Shipping not found");
    }

    const updatedShipping = await shippingRepository.update(
      {
        _id: id,
      },
      {
        $set: {
          shippingStatus,
        },
      },
      {
        new: true,
      },
    );

    logger.info(
      {
        shippingId: id,
        shippingStatus,
      },
      "Shipping status updated successfully",
    );

    return updatedShipping;
  }

  async delete(id: string) {
    logger.debug(
      {
        shippingId: id,
      },
      "Deleting shipping",
    );

    const shipping = await shippingRepository.get({
      _id: id,
    });

    if (!shipping) {
      logger.warn(
        {
          shippingId: id,
        },
        "Shipping not found",
      );

      throw new Error("Shipping not found");
    }

    await shippingRepository.delete({
      _id: id,
    });

    logger.info(
      {
        shippingId: id,
      },
      "Shipping deleted successfully",
    );

    return shipping;
  }
}

export default new ShippingService();