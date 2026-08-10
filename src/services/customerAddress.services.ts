import customerAddressRepository from "../repositories/customer/customerAddress.repository.js";
import customerRepository from "../repositories/customer/customer.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("CustomerAddressService");

class CustomerAddressService {
  async create(
    customerId: string,
    data: {
      fullName: string;
      email: string;
      country: string;
      city: string;
      area: string;
      postalCode: string;
      street: string;
      phone: number;
      isVerified?: boolean;
    },
  ) {
    logger.debug({ customerId }, "Creating customer address");

    const customer = await customerRepository.get({
      user: customerId,
    });

    if (!customer) {
      logger.warn({ customerId }, "Customer not found");

      throw new Error("Customer not found");
    }
    const address = await customerAddressRepository.create({
      customerId: customer._id,
      fullName: data.fullName,
      email: data.email,
      country: data.country,
      city: data.city,
      area: data.area,
      postalCode: data.postalCode,
      street: data.street,
      phone: data.phone,
      isVerified: data.isVerified ?? false,
    });

    logger.info(
      {
        addressId: address._id,
        customerId,
      },
      "Customer address created successfully",
    );

    return address;
  }

  async getAll(customerId: string) {
    logger.debug(
      { customerId },
      "Fetching customer addresses",
    );

    const customer = await customerRepository.get({
      user: customerId,
    });

    if (!customer) {
      logger.warn({ customerId }, "Customer not found");

      throw new Error("Customer not found");
    }

    const addresses = await customerAddressRepository.findAll({
      customerId: customer._id,
    });

    logger.info(
      {
        customerId,
        totalAddresses: addresses.length,
      },
      "Customer addresses fetched successfully",
    );

    return addresses;
  }

  async getById(customerId: string, addressId: string) {
    logger.debug(
      {
        customerId,
        addressId,
      },
      "Fetching customer address",
    );

    const customer = await customerRepository.get({
      user: customerId,
    });

    if (!customer) {
      logger.warn({ customerId }, "Customer not found");

      throw new Error("Customer not found");
    }

    const address = await customerAddressRepository.get({
      _id: addressId,
      customerId: customer._id,
    });

    if (!address) {
      logger.warn(
        {
          customerId,
          addressId,
        },
        "Customer address not found",
      );

      throw new Error("Customer address not found");
    }

    return address;
  }

  async update(
    customerId: string,
    addressId: string,
    data: {
      fullName?: string;
      email?: string;
      country?: string;
      city?: string;
      area?: string;
      postalCode?: string;
      street?: string;
      phone?: string;
      isVerified?: boolean;
    },
  ) {
    logger.debug(
      {
        customerId,
        addressId,
      },
      "Updating customer address",
    );

    const customer = await customerRepository.get({
      user: customerId,
    });

    if (!customer) {
      logger.warn({ customerId }, "Customer not found");

      throw new Error("Customer not found");
    }

    const existingAddress = await customerAddressRepository.get({
      _id: addressId,
      customerId: customer._id,
    });

    if (!existingAddress) {
      logger.warn(
        {
          customerId,
          addressId,
        },
        "Customer address not found",
      );

      throw new Error("Customer address not found");
    }

    const updatedAddress = await customerAddressRepository.update(
      {
        _id: addressId,
        customerId: customer._id,
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
        customerId,
        addressId,
      },
      "Customer address updated successfully",
    );

    return updatedAddress;
  }

  async delete(customerId: string, addressId: string) {
    logger.debug(
      {
        customerId,
        addressId,
      },
      "Deleting customer address",
    );

    const customer = await customerRepository.get({
      user: customerId,
    });

    if (!customer) {
      logger.warn({ customerId }, "Customer not found");

      throw new Error("Customer not found");
    }

    const address = await customerAddressRepository.get({
      _id: addressId,
      customerId: customer._id,
    });

    if (!address) {
      logger.warn(
        {
          customerId,
          addressId,
        },
        "Customer address not found",
      );

      throw new Error("Customer address not found");
    }

    await customerAddressRepository.delete({
      _id: addressId,
      customerId: customer._id,
    });

    logger.info(
      {
        customerId,
        addressId,
      },
      "Customer address deleted successfully",
    );

    return address;
  }
}

export default new CustomerAddressService();
