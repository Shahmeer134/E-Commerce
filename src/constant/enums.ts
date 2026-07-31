export const ROLES = {
  CUSTOMER: "customer",
  SHOP: "shop",
  ADMIN: "admin",
} as const;

export const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  OTHER: "other",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  BLOCKED: "blocked",
} as const;

export const SHOP_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  BLOCKED: "blocked",
} as const;

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  OUT_OF_STOCK: "out_of_stock",
} as const;

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
} as const;

export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: "cash_on_delivery",
  CREDIT_CARD: "credit_card",
  DEBIT_CARD: "debit_card",
  BANK_TRANSFER: "bank_transfer",
  JAZZCASH: "jazzcash",
  EASYPAISA: "easypaisa",
} as const;

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export const SHIPPING_STATUS = {
  PENDING: "pending",
  PACKED: "packed",
  SHIPPED: "shipped",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
} as const;

export const NOTIFICATION_TYPES = {
 ORDER: "order",
  PAYMENT: "payment",
  SHIPPING: "shipping",
  PROMOTION: "promotion",
  SYSTEM: "system",
} as const;