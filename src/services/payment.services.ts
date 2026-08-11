import paymentRepository from "../repositories/payment/payment.repository.js";
import { Logger } from "../utils/logger.js";
import { PAYMENT_STATUS } from "../constant/enums.js";

const logger = new Logger("PaymentService");

class PaymentService {
  async create(data: {
    order: string;
    paymentMethod: string;
    amount: number;
    transactionId?: string;
  }) {
    logger.debug(
      {
        orderId: data.order,
      },
      "Creating payment",
    );

    if (data.amount < 0) {
      logger.warn(
        {
          amount: data.amount,
        },
        "Invalid payment amount",
      );

      throw new Error("Payment amount cannot be negative");
    }

    const existingPayment = await paymentRepository.get({
      order: data.order,
    });

    if (existingPayment) {
      logger.warn(
        {
          orderId: data.order,
        },
        "Payment already exists for this order",
      );

      throw new Error("Payment already exists for this order");
    }

    const payment = await paymentRepository.create({
      order: data.order,
      paymentMethod: data.paymentMethod,
      amount: data.amount,
      transactionId: data.transactionId,
      paymentStatus: PAYMENT_STATUS.PENDING,
    });

    logger.info(
      {
        paymentId: payment._id,
        orderId: data.order,
      },
      "Payment created successfully",
    );

    return payment;
  }

  async getById(id: string) {
    logger.debug(
      {
        paymentId: id,
      },
      "Fetching payment",
    );

    const payment = await paymentRepository.get({
      _id: id,
    });

    if (!payment) {
      logger.warn(
        {
          paymentId: id,
        },
        "Payment not found",
      );

      throw new Error("Payment not found");
    }

    logger.info(
      {
        paymentId: id,
      },
      "Payment fetched successfully",
    );

    return payment;
  }

  async getByOrder(orderId: string) {
    logger.debug(
      {
        orderId,
      },
      "Fetching payment by order",
    );

    const payment = await paymentRepository.get({
      order: orderId,
    });

    if (!payment) {
      logger.warn(
        {
          orderId,
        },
        "Payment not found for order",
      );

      throw new Error("Payment not found for this order");
    }

    logger.info(
      {
        paymentId: payment._id,
        orderId,
      },
      "Payment fetched successfully",
    );

    return payment;
  }

  async getAll() {
    logger.debug("Fetching all payments");

    const payments = await paymentRepository.findAll();

    logger.info(
      {
        totalPayments: payments.length,
      },
      "All payments fetched successfully",
    );

    return payments;
  }

  async updateStatus(
    id: string,
    data: {
      paymentStatus: string;
      transactionId?: string;
    },
  ) {
    logger.debug(
      {
        paymentId: id,
      },
      "Updating payment status",
    );

    const payment = await paymentRepository.get({
      _id: id,
    });

    if (!payment) {
      logger.warn(
        {
          paymentId: id,
        },
        "Payment not found",
      );

      throw new Error("Payment not found");
    }

    const updateData: Record<string, any> = {
      paymentStatus: data.paymentStatus,
    };

    if (data.transactionId) {
      updateData.transactionId = data.transactionId;
    }

    if (data.paymentStatus === PAYMENT_STATUS.PAID) {
      updateData.paidAt = new Date();
    }

    const updatedPayment = await paymentRepository.update(
      {
        _id: id,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      },
    );

    logger.info(
      {
        paymentId: id,
        paymentStatus: data.paymentStatus,
      },
      "Payment status updated successfully",
    );

    return updatedPayment;
  }

  async delete(id: string) {
    logger.debug(
      {
        paymentId: id,
      },
      "Deleting payment",
    );

    const payment = await paymentRepository.get({
      _id: id,
    });

    if (!payment) {
      logger.warn(
        {
          paymentId: id,
        },
        "Payment not found",
      );

      throw new Error("Payment not found");
    }

    await paymentRepository.delete({
      _id: id,
    });

    logger.info(
      {
        paymentId: id,
      },
      "Payment deleted successfully",
    );

    return payment;
  }
}

export default new PaymentService();