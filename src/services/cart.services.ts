import cartRepository from "../repositories/cart/cart.repository.js";
import cartItemRepository from "../repositories/cart/cartItems.repository.js";
import customerRepository from "../repositories/customer/customer.repository.js";
import productRepository from "../repositories/product/product.repository.js";
import productVariantRepository from "../repositories/product/productVariants.repository.js";
import inventoryRepository from "../repositories/inventory/inventory.repository.js";
import { Logger } from "../utils/logger.js";

const logger = new Logger("CartService");

class CartServices {
  private async getCustomer(userId: string) {
    const customer = await customerRepository.get({
      user: userId,
    });

    if (!customer) {
      logger.warn({ userId }, "Customer not found");

      throw new Error("Customer not found");
    }

    return customer;
  }

  private async getExistingCart(userId: string) {
    const customer = await this.getCustomer(userId);

    const cart = await cartRepository.get({
      customerId: customer._id,
    });

    if (!cart) {
      logger.warn({ userId }, "Cart not found");

      throw new Error("Cart not found. Please create a cart first");
    }

    return cart;
  }

  async createCart(userId: string) {
    logger.debug({ userId }, "Creating cart");

    const customer = await this.getCustomer(userId);

    const existingCart = await cartRepository.get({
      customerId: customer._id,
    });

    if (existingCart) {
      logger.warn({ userId }, "Cart already exists");

      throw new Error("Cart already exists");
    }

    const cart = await cartRepository.create({
      customerId: customer._id,
    });

    logger.info({ cartId: cart._id.toString() }, "Cart created successfully");

    return cart;
  }

  async addItem(
    userId: string,
    data: { product: string; variant?: string; quantity?: number },
  ) {
    logger.debug({ userId, productId: data.product }, "Adding item to cart");

    const cart = await this.getExistingCart(userId);

    const product = await productRepository.get({
      _id: data.product,
    });

    if (!product) {
      logger.warn({ productId: data.product }, "Product not found");

      throw new Error("Product not found");
    }

    let price = product.price;

    if (data.variant) {
      const variant = await productVariantRepository.get({
        _id: data.variant,
        product: product._id,
      });

      if (!variant) {
        logger.warn({ variantId: data.variant }, "Product variant not found");

        throw new Error("Product variant not found");
      }

      price = variant.price;
    }

    const quantity = data.quantity || 1;

    const inventory = await inventoryRepository.get({
      product: product._id,
    });

    if (inventory && inventory.availableStock < quantity) {
      logger.warn(
        { productId: data.product, quantity },
        "Insufficient stock",
      );

      throw new Error("Insufficient stock");
    }

    const existingItem = await cartItemRepository.get({
      cart: cart._id,
      product: product._id,
      variant: data.variant || null,
    });

    let item;

    if (existingItem) {
      item = await cartItemRepository.update(
        { _id: existingItem._id },
        { $set: { quantity: existingItem.quantity + quantity, price } },
        { new: true },
      );
    } else {
      item = await cartItemRepository.create({
        cart: cart._id,
        product: product._id,
        variant: data.variant,
        quantity,
        price,
      });
    }

    logger.info(
      { cartId: cart._id.toString(), productId: product._id.toString() },
      "Item added to cart",
    );

    return item;
  }

  async getCart(userId: string) {
    logger.debug({ userId }, "Fetching cart");

    const cart = await this.getExistingCart(userId);

    const items = await cartItemRepository
      .findAll({ cart: cart._id })
      .populate("product")
      .populate("variant");

    logger.info(
      { cartId: cart._id.toString(), totalItems: items.length },
      "Cart fetched successfully",
    );

    return { cart, items };
  }

  async updateItem(userId: string, itemId: string, quantity: number) {
    logger.debug({ userId, itemId, quantity }, "Updating cart item");

    const cart = await this.getExistingCart(userId);

    const item = await cartItemRepository.get({
      _id: itemId,
      cart: cart._id,
    });

    if (!item) {
      logger.warn({ itemId }, "Cart item not found");

      throw new Error("Cart item not found");
    }

    const inventory = await inventoryRepository.get({
      product: item.product,
    });

    if (inventory && inventory.availableStock < quantity) {
      logger.warn({ itemId, quantity }, "Insufficient stock");

      throw new Error("Insufficient stock");
    }

    const updatedItem = await cartItemRepository.update(
      { _id: itemId },
      { $set: { quantity } },
      { new: true },
    );

    logger.info({ itemId }, "Cart item updated successfully");

    return updatedItem;
  }

  async removeItem(userId: string, itemId: string) {
    logger.debug({ userId, itemId }, "Removing cart item");

    const cart = await this.getExistingCart(userId);

    const item = await cartItemRepository.get({
      _id: itemId,
      cart: cart._id,
    });

    if (!item) {
      logger.warn({ itemId }, "Cart item not found");

      throw new Error("Cart item not found");
    }

    const deletedItem = await cartItemRepository.delete({
      _id: itemId,
      cart: cart._id,
    });

    logger.info({ itemId }, "Cart item removed successfully");

    return deletedItem;
  }

  async clearCart(userId: string) {
    logger.debug({ userId }, "Clearing cart");

    const cart = await this.getExistingCart(userId);

    const items = await cartItemRepository.findAll({ cart: cart._id });

    await Promise.all(
      items.map((item) => cartItemRepository.delete({ _id: item._id })),
    );

    logger.info(
      { cartId: cart._id.toString(), totalItems: items.length },
      "Cart cleared successfully",
    );

    return { message: "Cart cleared" };
  }
}

export default new CartServices();