import shopRepository from "../repositories/shop/shop.repository.js";
import categoryRepository from "../repositories/product/category.repository.js";
import { logger } from "../utils/helper.js";

class ShopService {
  async create(data: any, ownerId: string) {
    logger.debug(
      {
        ownerId,
        shopName: data.shopName,
      },
      "Creating shop",
    );

    const existingShop = await shopRepository.get({
      ownerId: ownerId,
    });

    if (existingShop) {
      logger.warn({ ownerId }, "Shop already exists for this owner");
      throw new Error("You already own a shop");
    }

    const category = await categoryRepository.get({
      _id: data.category,
    });

    if (!category) {
      logger.warn(
        {
          categoryId: data.category,
        },
        "Shop category not found",
      );

      throw new Error("Category not found");
    }

    const existingShopName = await shopRepository.get({
      shopName: data.shopName,
    });

    if (existingShopName) {
      logger.warn(
        {
          shopName: data.shopName,
        },
        "Shop name already exists",
      );

      throw new Error("Shop name already exists");
    }

    const existingSlug = await shopRepository.get({
      slug: data.slug,
    });

    if (existingSlug) {
      logger.warn(
        {
          slug: data.slug,
        },
        "Shop slug already exists",
      );

      throw new Error("Shop slug already exists");
    }

    const shop = await shopRepository.create({
      owner: ownerId,
      category: data.category,
      shopName: data.shopName,
      description: data.description,
      logo: data.logo,
      address: data.address,
      city: data.city,
      country: data.country,
      slug: data.slug,
      status: "pending",
    });

    logger.info(
      {
        shopId: shop._id.toString(),
        ownerId,
      },
      "Shop created successfully",
    );

    return shop;
  }

  //   Get myShop

  async getMyShop(ownerId: string) {
    logger.debug(
      {
        ownerId,
      },
      "Fetching shop for owner",
    );

    const shop = await shopRepository.get({
      owner: ownerId,
    });

    if (!shop) {
      logger.warn(
        {
          ownerId,
        },
        "Shop not found for owner",
      );

      throw new Error("Shop not found for this owner");
    }

    logger.info(
      {
        shopId: shop._id.toString(),
      },
      "Seller shop fetched successfully",
    );
    return shop;
  }

  async getShopById(id: string) {
    logger.debug(
      {
        shopId: id,
      },
      "Fetching shop by id",
    );

    const shop = await shopRepository.get({
      _id: id,
    });

    if (!shop) {
      logger.warn(
        {
          shopId: id,
        },
        "Shop not found",
      );

      throw new Error("Shop not found");
    }

    return shop;
  }

  async getAll() {
    logger.debug("Fetching all shops");

    const shops = await shopRepository.findAll({
      status: "active",
    });

    logger.info(
      {
        totalShops: shops.length,
      },
      "All shops fetched successfully",
    );
    return shops;
  }

  async update(id: string, ownerId: string, data: any) {
    logger.debug(
      {
        shopId: id,
        ownerId,
      },
      "Updating shop",
    );

    delete data.owner;

    if (data.category) {
      const category = await categoryRepository.get({
        _id: data.category,
      });

      if (!category) {
        logger.warn(
          {
            categoryId: data.category,
          },
          "Category not found during shop update",
        );

        throw new Error("Category not found");
      }
    }

    const shop = await shopRepository.update(
      {
        _id: id,
        owner: ownerId,
      },
      data,
      {
        new: true,
      },
    );

    if (!shop) {
      logger.warn(
        {
          shopId: id,
          ownerId,
        },
        "Shop not found or doesn't belong to seller",
      );

      throw new Error("Shop not found or unauthorized");
    }

    logger.info(
      {
        shopId: id,
        ownerId,
      },
      "Shop updated successfully",
    );

    return shop;
  }

  //   Delete

  async delete(id: string, ownerId: string) {
    logger.debug(
      {
        shopId: id,
        ownerId,
      },
      "Deleting shop",
    );

    const shop = await shopRepository.delete({
      _id: id,
      owner: ownerId,
    });

    if (!shop) {
      logger.warn(
        {
          shopId: id,
          ownerId,
        },
        "Shop not found or doesn't belong to seller",
      );
      throw new Error("Shop not found or unauthorized");
    }
    
    logger.info(
      {
        shopId: id,
        ownerId,
      },
      "Shop deleted successfully",
    );

    return shop;
  };
};

export default new ShopService();
