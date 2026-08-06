import productRepository from "../repositories/product/product.repository.js";
import shopRepository from "../repositories/shop/shop.repository.js";
import category from "../repositories/category/category.repository.js";
import { Logger } from "../utils/logger.js";
import categoryController from "../controller/categoryController.js";
import categoryRepository from "../repositories/category/category.repository.js";

const logger = new Logger("ProductService");

class ProductService {
  async create(data: any, ownerId: string) {
    logger.debug(
      {
        ownerId,
        title: data.title,
      },
      "Creating Product",
    );

    const shop = await shopRepository.get({
      owner: ownerId,
    });

    if (!shop) {
      logger.warn(
        {
          ownerId,
        },
        "Shop found for product creation",
      );
      throw new Error("You don't have a shop");
    }

    const category = categoryRepository.get({
      _id: data.category,
    });

    if (!category) {
      logger.warn(
        {
          categoryId: data.category,
        },
        "Category not found",
      );

      throw new Error("Category not found");
    }

    const existingSlug = await productRepository.get({
      slug: data.slug,
    });

    if (existingSlug) {
      logger.warn(
        {
          slug: data.slug,
        },
        "Product slug already exists",
      );

      throw new Error("Product slug already exists");
    }

    const existingSku = await productRepository.get({
      sku: data.sku,
    });

    if (existingSku) {
      logger.warn(
        {
          sku: data.sku,
        },
        "Product SKU already exists",
      );

      throw new Error("Product SKU already exists");
    }

    const product = await productRepository.create({
      shop: shop._id,
      category: data.category,
      title: data.title,
      slug: data.slug,
      description: data.description,
      brand: data.brand || "Generic",
      sku: data.sku,
      price: data.price,
      discountPrice: data.discountPrice || 0,
      stock: data.stock || 0,
      sold: 0,
      thumbnail: data.thumbnail,
      averageRating: 0,
      totalReviews: 0,
      status: "pending",
    });

    logger.info(
      {
        productId: product._id.toString(),
        shopId: shop._id.toString(),
      },
      "Product created successfully",
    );

    return product;
  }

  async getAll() {
    logger.debug("Fetching all products");

    const products = await productRepository.findAll();

    logger.info(
      {
        count: products.length,
      },
      "Products fetched successfully",
    );

    return products;
  }

  async getById(id: string) {
    logger.debug(
      {
        productId: id,
      },
      "Fetching product",
    );

    const product = await productRepository.get({
      _id: id,
    });

    if (!product) {
      logger.warn(
        {
          productId: id,
        },
        "Product not found",
      );

      throw new Error("Product not found");
    }

    return product;
  }

  async getMyProducts(ownerId: string) {
    logger.debug(
      {
        ownerId,
      },
      "Fetching seller products",
    );

    const shop = await shopRepository.get({
      owner: ownerId,
    });

    if (!shop) {
      logger.warn(
        {
          ownerId,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }
    const products = await productRepository.findAll({
      shop: shop._id,
    });

    logger.info(
      {
        ownerId,
        count: products.length,
      },
      "Seller products fetched successfully",
    );

    return products;
  }
  async update(id: string, ownerId: string, data: any) {
    logger.debug(
      {
        productId: id,
        ownerId,
      },
      "Updating product",
    );

    const shop = await shopRepository.get({
      owner: ownerId,
    });
    if (!shop) {
      logger.warn(
        {
          ownerId,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }

    // Make sure product belongs to seller's shop
    const product = await productRepository.get({
      _id: id,
      shop: shop._id,
    });

    if (!product) {
      logger.warn(
        {
          productId: id,
          shopId: shop._id.toString(),
        },
        "Product not found or unauthorized",
      );

      throw new Error("Product not found or unauthorized");
    }
    // Don't allow changing shop
    delete data.shop;
    delete data.sold;
    delete data.averageRating;
    delete data.totalReviews;

    // Check category if changing
    if (data.category) {
      const category = await categoryRepository.get({
        _id: data.category,
      });

      if (!category) {
        logger.warn(
          {
            categoryId: data.category,
          },
          "Category not found",
        );

        throw new Error("Category not found");
      }
    }

    // Check slug if changing
    if (data.slug && data.slug !== product.slug) {
      const existingSlug = await productRepository.get({
        slug: data.slug,
        _id: { $ne: id },
      });

      if (existingSlug) {
        logger.warn(
          {
            slug: data.slug,
          },
          "Product slug already exists",
        );

        throw new Error("Product slug already exists");
      }
    }

    // Check SKU if changing
    if (data.sku && data.sku !== product.sku) {
      const existingSku = await productRepository.get({
        sku: data.sku,
        _id: { $ne: id },
      });

      if (existingSku) {
        logger.warn(
          {
            sku: data.sku,
          },
          "Product SKU already exists",
        );

        throw new Error("Product SKU already exists");
      }
    }

    const updatedProduct = await productRepository.update(
      {
        _id: id,
        shop: shop._id,
      },
      data,
      {
        new: true,
      },
    );

    if (!updatedProduct) {
      logger.warn(
        {
          productId: id,
        },
        "Product update failed",
      );

      throw new Error("Product update failed");
    }

    logger.info(
      {
        productId: id,
        shopId: shop._id.toString(),
      },
      "Product updated successfully",
    );

    return updatedProduct;
  }

  // DELETE PRODUCT
  async delete(id: string, ownerId: string) {
    logger.debug(
      {
        productId: id,
        ownerId,
      },
      "Deleting product",
    );

    const shop = await shopRepository.get({
      owner: ownerId,
    });
    if (!shop) {
      logger.warn(
        {
          ownerId,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }
    const product = await productRepository.delete({
      _id: id,
      shop: shop._id,
    });

    if (!product) {
      logger.warn(
        {
          productId: id,
          shopId: shop._id.toString(),
        },
        "Product not found or unauthorized",
      );

      throw new Error("Product not found or unauthorized");
    }
    logger.info(
      {
        productId: id,
        shopId: shop._id.toString(),
      },
      "Product deleted successfully",
    );

    return product;
  }
}

export default new ProductService();
