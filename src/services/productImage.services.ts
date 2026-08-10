import productImageRepository from "../repositories/product/productImages.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("productImageService");

class ProductImageService {
  async create(data: {
    product: string;
    imageUrl: string;
    isPrimary?: boolean;
  }) {
    logger.debug("Creating product image");

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

    if (data.isPrimary === true) {
      await productImageRepository.updateMany(
        {
          product: data.product,
          isPrimary: true,
        },
        {
          $set: {
            isPrimary: false,
          },
        },
      );
    }

    const productImage = await productImageRepository.create({
      product: data.product,
      imageUrl: data.imageUrl,
      isPrimary: data.isPrimary,
    });
    logger.info(
      {
        productImageId: productImage._id,
        productId: data.product,
      },
      "Product image created successfully",
    );
    return productImage;
  }

  async getAllByProduct(productId: string) {
    logger.debug(
      {
        productId,
      },
      "Fetching product images",
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
    const images = await productImageRepository.findAll({
      product: productId,
    });

    logger.info(
      {
        productId,
        totalImages: images.length,
      },
      "Product images fetched successfully",
    );

    return images;
  }
  async getById(id: string) {
    logger.debug(
      {
        productImageId: id,
      },
      "Fetching product image",
    );

    const image = await productImageRepository.get({
      _id: id,
    });

    if (!image) {
      logger.warn(
        {
          productImageId: id,
        },
        "Product image not found",
      );

      throw new Error("Product image not found");
    }
    return image;
  }

  async update(
    id: string,
    data: {
      imageUrl?: string;
      isPrimary?: boolean;
    },
  ) {
    logger.debug(
      {
        productImageId: id,
      },
      "Updating product image",
    );

    const existingImage = await productImageRepository.get({
      _id: id,
    });
    if (!existingImage) {
      logger.warn(
        {
          productImageId: id,
        },
        "Product image not found",
      );

      throw new Error("Product image not found");
    }

    if (data.isPrimary === true) {
      await productImageRepository.updateMany(
        {
          product: existingImage.product,
          isPrimary: true,
        },
        {
          $set: {
            isPrimary: false,
          },
        },
      );
    }
    const updatedImage = await productImageRepository.update(
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
        productImageId: id,
      },
      "Product image updated successfully",
    );

    return updatedImage;
  }

  async delete(id: string) {
    logger.debug(
      {
        productImageId: id,
      },
      "Deleting product image",
    );

    const image = await productImageRepository.get({
      _id: id,
    });

    if (!image) {
      logger.warn(
        {
          productImageId: id,
        },
        "Product image not found",
      );

      throw new Error("Product image not found");
    }
    await productImageRepository.delete({
      _id: id,
    });

    logger.info(
      {
        productImageId: id,
      },
      "Product image deleted successfully",
    );

    return image;
  }
}

export default new ProductImageService();
