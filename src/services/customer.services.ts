import customerRepository from "../repositories/customer/customer.repository.js";
import userRepository from "../repositories/user/user.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("CustomerService");

class CustomerService {
  async create(
    userId: string,
    data: {
      gender: string;
      dateOfBirth: Date;
    },
  ) {
    logger.debug(
      {
        userId,
      },
      "Creating customer profile",
    );

    const user = await userRepository.get({
      _id: userId,
    });

    if (!user) {
      logger.warn(
        {
          userId,
        },
        "User not found",
      );
      throw new Error("User not found");
    }

    const existingCustomer = await customerRepository.get({
      user: userId,
    });

    if (existingCustomer) {
      logger.warn(
        {
          userId,
        },
        "Customer profile already exists",
      );

      throw new Error("Customer profile already exists");
    }

    const customer = await customerRepository.create({
      user: userId,
      gender: data.gender,
      dateOfBirth: data.dateOfBirth,
    });

    logger.info(
      {
        customerId: customer._id,
        userId,
      },
      "Customer profile created successfully",
    );

    return customer;
  }

  async getMyProfile(userId: string) {
    logger.debug(
      {
        userId,
      },
      "Fetching customer profile",
    );

    const customer = await customerRepository.get({
      user: userId,
    });

    if (!customer) {
      logger.warn(
        {
          userId,
        },
        "Customer profile not found",
      );

      throw new Error("Customer profile not found");
    }
    logger.info(
      {
        customerId: customer._id,
        userId,
      },
      "Customer profile fetched successfully",
    );

    return customer;
  }
  async getById(id: string) {
    logger.debug(
      {
        customerId: id,
      },
      "Fetching customer",
    );

    const customer = await customerRepository.get({
      _id: id,
    });

    if (!customer) {
      logger.warn(
        {
          customerId: id,
        },
        "Customer not found",
      );

      throw new Error("Customer not found");
    }

    return customer;
  }

  async getAll() {
    logger.debug("Fetching all customers");

    const customers = await customerRepository.findAll();

    logger.info(
      {
        totalCustomers: customers.length,
      },
      "All customers fetched successfully",
    );

    return customers;
  }

  async update(
    userId: string,
    data: {
      gender?: string;
      dateOfBirth?: Date;
    },
  ) {
    logger.debug(
      {
        userId,
      },
      "Updating customer profile",
    );

    const customer = await customerRepository.get({
      user: userId,
    });

    if (!customer) {
      logger.warn(
        {
          userId,
        },
        "Customer profile not found",
      );

      throw new Error("Customer profile not found");
    }

    const updatedCustomer = await customerRepository.update(
      {
        user: userId,
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
        customerId: customer._id,
        userId,
      },
      "Customer profile updated successfully",
    );

    return updatedCustomer;
  }

  async delete(userId: string) {
    logger.debug(
      {
        userId,
      },
      "Deleting customer profile",
    );

    const customer = await customerRepository.get({
      user: userId,
    });

    if (!customer) {
      logger.warn(
        {
          userId,
        },
        "Customer profile not found",
      );

      throw new Error("Customer profile not found");
    }

    await customerRepository.delete({
      user: userId,
    });

    logger.info(
      {
        customerId: customer._id,
        userId,
      },
      "Customer profile deleted successfully",
    );

    return customer;
  }
}

export default new CustomerService();
