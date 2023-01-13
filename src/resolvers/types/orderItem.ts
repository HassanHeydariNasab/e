import { OrderItemResolvers } from "@types";
import { ProductsCollection } from "@models";

const product: OrderItemResolvers["product"] = async (
  { productId },
  _,
  { userId }
) => {
  const product = await ProductsCollection.findOne({
    _id: productId,
  });
  return product;
};

export const orderItemResolvers: OrderItemResolvers = {
  product,
};
