import reviewRepository from "../repositories/review/reviewStatus.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import customerRepository from "../repositories/customer/customer.repository.js";
import orderRepository from "../repositories/orders/order.repository.js";
import orderItemRepository from "../repositories/orders/orderItems.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("ReviewService");

class ReviewService {
  // CREATE REVIEW
  async create(data: {
    customer: string;
    product: string;
    rating: number;
    review?: string;
  }) {
    logger.debug(
      {
        customerId: data.customer,
        productId: data.product,
      },
      "Creating product review",
    );

    // Check customer
    const customer = await customerRepository.get({
      _id: data.customer,
    });

    if (!customer) {
      logger.warn(
        {
          customerId: data.customer,
        },
        "Customer not found",
      );

      throw new Error("Customer not found");
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

    // Validate rating
    if (data.rating < 1 || data.rating > 5) {
      logger.warn(
        {
          rating: data.rating,
        },
        "Invalid review rating",
      );

      throw new Error("Rating must be between 1 and 5");
    }

    // Check whether customer already reviewed this product
    const existingReview = await reviewRepository.get({
      customer: data.customer,
      product: data.product,
    });

    if (existingReview) {
      logger.warn(
        {
          customerId: data.customer,
          productId: data.product,
        },
        "Customer already reviewed this product",
      );

      throw new Error("You have already reviewed this product");
    }

    // Check whether customer purchased this product
    const orders = await orderRepository.findAll({
      customer: data.customer,
    });

    const orderIds = orders.map((order) => order._id);

    const purchasedProduct = await orderItemRepository.get({
      order: { $in: orderIds },
      product: data.product,
    });

    if (!purchasedProduct) {
      logger.warn(
        {
          customerId: data.customer,
          productId: data.product,
        },
        "Customer has not purchased this product",
      );

      throw new Error(
        "You can only review a product that you have purchased",
      );
    }

    const review = await reviewRepository.create({
      customer: data.customer,
      product: data.product,
      rating: data.rating,
      review: data.review,
    });

    logger.info(
      {
        reviewId: review._id,
        customerId: data.customer,
        productId: data.product,
      },
      "Product review created successfully",
    );

    // Update product rating statistics
    await this.updateProductRating(data.product);

    return review;
  }

  // GET ALL REVIEWS
  async getAll() {
    logger.debug("Fetching all reviews");

    const reviews = await reviewRepository.findAll();

    logger.info(
      {
        totalReviews: reviews.length,
      },
      "All reviews fetched successfully",
    );

    return reviews;
  }

  // GET REVIEWS BY PRODUCT
  async getByProduct(productId: string) {
    logger.debug(
      {
        productId,
      },
      "Fetching product reviews",
    );

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

    const reviews = await reviewRepository.findAll({
      product: productId,
    });

    logger.info(
      {
        productId,
        totalReviews: reviews.length,
      },
      "Product reviews fetched successfully",
    );

    return reviews;
  }

  // GET REVIEW BY ID
  async getById(id: string) {
    logger.debug(
      {
        reviewId: id,
      },
      "Fetching review",
    );

    const review = await reviewRepository.get({
      _id: id,
    });

    if (!review) {
      logger.warn(
        {
          reviewId: id,
        },
        "Review not found",
      );

      throw new Error("Review not found");
    }

    return review;
  }

  // GET CUSTOMER'S REVIEWS
  async getByCustomer(customerId: string) {
    logger.debug(
      {
        customerId,
      },
      "Fetching customer reviews",
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

    const reviews = await reviewRepository.findAll({
      customer: customerId,
    });

    logger.info(
      {
        customerId,
        totalReviews: reviews.length,
      },
      "Customer reviews fetched successfully",
    );

    return reviews;
  }

  // UPDATE REVIEW
  async update(
    id: string,
    customerId: string,
    data: {
      rating?: number;
      review?: string;
    },
  ) {
    logger.debug(
      {
        reviewId: id,
        customerId,
      },
      "Updating review",
    );

    const existingReview = await reviewRepository.get({
      _id: id,
    });

    if (!existingReview) {
      logger.warn(
        {
          reviewId: id,
        },
        "Review not found",
      );

      throw new Error("Review not found");
    }

    // Make sure customer owns this review
    if (existingReview.customer.toString() !== customerId) {
      logger.warn(
        {
          reviewId: id,
          customerId,
        },
        "Customer attempted to update another customer's review",
      );

      throw new Error("You can only update your own review");
    }

    if (
      data.rating !== undefined &&
      (data.rating < 1 || data.rating > 5)
    ) {
      throw new Error("Rating must be between 1 and 5");
    }

    const updatedReview = await reviewRepository.update(
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
        reviewId: id,
      },
      "Review updated successfully",
    );

    await this.updateProductRating(
      existingReview.product.toString(),
    );

    return updatedReview;
  }

  // DELETE REVIEW
  async delete(id: string, customerId: string) {
    logger.debug(
      {
        reviewId: id,
        customerId,
      },
      "Deleting review",
    );

    const existingReview = await reviewRepository.get({
      _id: id,
    });

    if (!existingReview) {
      logger.warn(
        {
          reviewId: id,
        },
        "Review not found",
      );

      throw new Error("Review not found");
    }

    if (existingReview.customer.toString() !== customerId) {
      logger.warn(
        {
          reviewId: id,
          customerId,
        },
        "Customer attempted to delete another customer's review",
      );

      throw new Error("You can only delete your own review");
    }

    await reviewRepository.delete({
      _id: id,
    });

    logger.info(
      {
        reviewId: id,
      },
      "Review deleted successfully",
    );

    await this.updateProductRating(
      existingReview.product.toString(),
    );

    return existingReview;
  }

  // UPDATE PRODUCT RATING
  private async updateProductRating(productId: string) {
    const reviews = await reviewRepository.findAll({
      product: productId,
    });

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce(
            (sum, item) => sum + item.rating,
            0,
          ) / totalReviews;

    await productRepository.update(
      {
        _id: productId,
      },
      {
        $set: {
          averageRating: Number(averageRating.toFixed(2)),
          totalReviews,
        },
      },
      {
        new: true,
      },
    );

    logger.debug(
      {
        productId,
        averageRating,
        totalReviews,
      },
      "Product rating statistics updated",
    );
  }
}

export default new ReviewService();