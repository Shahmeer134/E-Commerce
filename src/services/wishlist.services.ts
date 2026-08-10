import wishlistRepository from "../repositories/user/wishlist.repository.js";
import customerRepository from "../repositories/customer/customer.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("WishlistService");

class WishlistService{
     async add(
    customerId: string,
    productId: string,
  ) {
    logger.debug(
      {
        customerId,
        productId,
      },
      "Adding product to wishlist",
    );

    // Check customer
    const customer = await customerRepository.get({
      _id: customerId,
    });
 if (!customer) {
      logger.warn(
        {
          customerId,
        },
        "Customer not found",
      );

      throw new Error("Customer not found");
    }

    // Check product
    const product = await productRepository.get({
      _id: productId,
    });
if (!product) {
      logger.warn(
        {
          productId,
        },
        "Product not found",
      );

      throw new Error("Product not found");
    }

    // Check duplicate
    const existingWishlist = await wishlistRepository.get({
      customer: customerId,
      product: productId,
    });

    if (existingWishlist) {
      logger.warn(
        {
          customerId,
          productId,
        },
        "Product already exists in wishlist",
      );

      throw new Error("Product already exists in wishlist");
    }
 const wishlist = await wishlistRepository.create({
      customer: customerId,
      product: productId,
    });

    logger.info(
      {
        wishlistId: wishlist._id,
        customerId,
        productId,
      },
      "Product added to wishlist successfully",
    );

    return wishlist;
  }
async getAll(customerId: string) {
    logger.debug(
      {
        customerId,
      },
      "Fetching customer wishlist",
    );

    const customer = await customerRepository.get({
      _id: customerId,
    });

    if (!customer) {
      logger.warn(
        {
          customerId,
        },
        "Customer not found",
      );

      throw new Error("Customer not found");
    }

    const wishlist = await wishlistRepository.findAll({
      customer: customerId,
    });

    logger.info(
      {
        customerId,
        totalItems: wishlist.length,
      },
      "Wishlist fetched successfully",
    );

    return wishlist;
  }

   async getById(
    customerId: string,
    wishlistId: string,
  ) {
    logger.debug(
      {
        customerId,
        wishlistId,
      },
      "Fetching wishlist item",
    );

    const wishlist = await wishlistRepository.get({
      _id: wishlistId,
      customer: customerId,
    });

    if (!wishlist) {
      logger.warn(
        {
          customerId,
          wishlistId,
        },
        "Wishlist item not found",
      );

      throw new Error("Wishlist item not found");
    }

    return wishlist;
  }

  async remove(
    customerId: string,
    wishlistId: string,
  ) {
    logger.debug(
      {
        customerId,
        wishlistId,
      },
      "Removing product from wishlist",
    );

    const wishlist = await wishlistRepository.get({
      _id: wishlistId,
      customer: customerId,
    });

    if (!wishlist) {
      logger.warn(
        {
          customerId,
          wishlistId,
        },
        "Wishlist item not found",
      );

      throw new Error("Wishlist item not found");
    }

    await wishlistRepository.delete({
      _id: wishlistId,
      customer: customerId,
    });

    logger.info(
      {
        wishlistId,
        customerId,
        productId: wishlist.product,
      },
      "Product removed from wishlist successfully",
    );

    return wishlist;
  }

  async removeByProduct(
    customerId: string,
    productId: string,
  ) {
    logger.debug(
      {
        customerId,
        productId,
      },
      "Removing product from wishlist",
    );

    const wishlist = await wishlistRepository.get({
      customer: customerId,
      product: productId,
    });

    if (!wishlist) {
      logger.warn(
        {
          customerId,
          productId,
        },
        "Product not found in wishlist",
      );

      throw new Error("Product not found in wishlist");
    }

    await wishlistRepository.delete({
      customer: customerId,
      product: productId,
    });

    logger.info(
      {
        customerId,
        productId,
      },
      "Product removed from wishlist successfully",
    );

    return wishlist;
  }
}

export default new WishlistService();
