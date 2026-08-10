import productVariantRepository from "../repositories/product/productVariants.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import shopRepository from "../repositories/shop/shop.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("ProductVariantService");

class ProductVariantServices {
  async create(data: any, ownerId: string) {
    logger.debug(
      {
        ownerId,
        productId: data.product,
      },
      "Creating product variant",
    );
    const shop = await shopRepository.get({
      owner: ownerId,
    });

    if (!shop) {
      logger.warn({ ownerId }, "Shop not found");

      throw new Error("Shop not found");
    }

    const product = await productRepository.get({
      _id: data.product,
      shop: shop._id,
    });

    if (!product) {
      logger.warn(
        {
          productId: data.product,
          shopId: shop._id.toString(),
        },
        "Product not found or unauthorized",
      );

      throw new Error("Product not found or unauthorized");
    }

    const existingSku = await productVariantRepository.get({
      sku: data.sku,
    });

    if (existingSku) {
      logger.warn(
        {
          sku: data.sku,
        },
        "Variant SKU already exists",
      );

      throw new Error("Variant SKU already exists");
    }

    const variant = await productVariantRepository.create({
      product: product._id,
      color: data.color,
      size: data.size,
      sku: data.sku,
      price: data.price,
      stock: data.stock || 0,
    });

    logger.info(
      {
        variantId: variant._id.toString(),
        productId: product._id.toString(),
      },
      "Product variant created successfully",
    );

    return variant;
  }

  async getByProduct(productId: string) {
    logger.debug({ productId }, "Fetched product Ids");

    const variant = await productVariantRepository.findAll({
      product: productId,
    });

    logger.info({ productId, totalVariants: variant.length });
    return variant;
  }

  async getById(id: string) {
    logger.debug({ variantId: id }, "Fetching product variant");

    const variant = await productVariantRepository.get({
      _id: id,
    });

    if (!variant) {
      logger.warn({ variantId: id }, "Product variant not found");

      throw new Error("Product variant not found");
    }

    return variant;
  }

  async update(id: string, ownerId: string, data: any) {
    logger.debug(
      {
        variantId: id,
        ownerId,
      },
      "Updating product variant",
    );

    // Find seller's shop
    const shop = await shopRepository.get({
      owner: ownerId,
    });

    if (!shop) {
      logger.warn({ ownerId }, "Shop not found");

      throw new Error("Shop not found");
    }

    // Find variant
    const variant = await productVariantRepository.get({
      _id: id,
    });

    if (!variant) {
      logger.warn({ variantId: id }, "Product variant not found");

      throw new Error("Product variant not found");
    }

    const product = await productRepository.get({
      _id: variant.product,
      shop: shop._id,
    });

    if (!product) {
      logger.warn(
        {
          variantId: id,
          shopId: shop._id.toString(),
        },
        "Unauthorized variant update",
      );

      throw new Error("You don't have permission to update this variant");
    }

    if (data.sku && data.sku !== variant.sku) {
      const existingSku = await productVariantRepository.get({
        sku: data.sku,
        _id: { $ne: id },
      });

      if (existingSku) {
        logger.warn({ sku: data.sku }, "Variant SKU already exists");

        throw new Error("Variant SKU already exists");
      }
    }
    delete data.product;

    const updatedVariant = await productVariantRepository.update(
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

    if (!updatedVariant) {
      logger.warn({ variantId: id }, "Variant update failed");

      throw new Error("Product variant update failed");
    }

    logger.info(
      {
        variantId: id,
      },
      "Product variant updated successfully",
    );

    return updatedVariant;
  }

  async delete(id: string, ownerId: string) {
    logger.debug(
      {
        variantId: id,
        ownerId,
      },
      "Deleting product variant",
    );

    const shop = await shopRepository.get({
      owner: ownerId,
    });

    if (!shop) {
      logger.warn({ ownerId }, "Shop not found");

      throw new Error("Shop not found");
    }

    const variant = await productVariantRepository.get({
      _id: id,
    });

    if (!variant) {
      logger.warn({ variantId: id }, "Product variant not found");

      throw new Error("Product variant not found");
    }

    const product = await productRepository.get({
      _id: variant.product,
      shop: shop._id,
    });

    if (!product) {
      logger.warn(
        {
          variantId: id,
        },
        "Unauthorized variant deletion",
      );

      throw new Error("You don't have permission to delete this variant");
    }

    const deletedVariant = await productVariantRepository.delete({
      _id: id,
    });

    if (!deletedVariant) {
      logger.warn({ variantId: id }, "Variant deletion failed");

      throw new Error("Product variant deletion failed");
    }

    logger.info(
      {
        variantId: id,
      },
      "Product variant deleted successfully",
    );

    return deletedVariant;
  } 
}

export default new ProductVariantServices;