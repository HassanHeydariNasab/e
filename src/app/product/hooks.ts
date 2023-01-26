import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApolloClient, useQuery } from "@apollo/client";
import type { SubmitHandler } from "react-hook-form";

import type {
  Category,
  Product,
  QueryProductArgs,
  QueryProductsInProductGroupArgs,
} from "@types";
import { GET_CATEGORIES, GET_PRODUCT } from "@operations";
import { GET_PRODUCTS_IN_PRODUCT_GROUP } from "operations/getProductsInProductGroup";
import type { AttributeOptionsFormSchema } from "./consts";

interface Props {
  productId: string | null;
}

export const useProduct = ({ productId }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!productId) router.replace("/");

  const [imageId, setImageId] = useState<string | undefined>(undefined);
  const [attributeOptions, setAttributeOptions] = useState<
    Record<string, string[]>
  >({});
  const [attributeOption, setAttributeOption] = useState<
    Record<string, string>
  >({});

  const apolloClient = useApolloClient();

  const { data: productData, loading: isLoadingProduct } = useQuery<
    {
      product: Product;
    },
    QueryProductArgs
  >(GET_PRODUCT, {
    variables: { productId },
    skip: !productId,
    onCompleted({ product: { defaultImageId, attributeValues } }) {
      setImageId(defaultImageId);
      updateAttributeOption(attributeValues);
    },
  });

  const { data: productsData, loading: isLoadingProducts } = useQuery<
    {
      productsInProductGroup: Product[];
    },
    QueryProductsInProductGroupArgs
  >(GET_PRODUCTS_IN_PRODUCT_GROUP, {
    variables: { productId },
    skip: !productId,
    onCompleted({ productsInProductGroup }) {
      updateAttributeOptions(productsInProductGroup);
    },
  });

  const product = productData?.product;
  const products = productsData?.productsInProductGroup || [];

  const onChangeAttributeOption: SubmitHandler<AttributeOptionsFormSchema> = (
    data,
    event
  ) => {
    const changedAttributeName = event?.target.name;
    let productId: string = product?._id;
    let rank: number = 0;
    let newRank: number = 0;
    for (let _product of products) {
      newRank = 0;
      for (let attributeValue of _product.attributeValues) {
        if (data[attributeValue.name] === attributeValue.value) {
          if (attributeValue.name === changedAttributeName) newRank += 1000;
          newRank++;
        }
      }
      if (newRank > rank) {
        rank = newRank;
        productId = _product._id;
      }
    }
    if (product?._id !== productId) {
      router.replace(`/product?id=${productId}`); // TODO implement shallow routing when it's available
    }
  };

  const updateAttributeOptions = (products: Product[]) => {
    const attributes: Record<string, string[]> = {}; // maps attribute name to values
    for (let product of products) {
      for (let attributeValue of product.attributeValues) {
        const hasAttributeKey = Object.keys(attributes).includes(
          attributeValue.name
        );
        if (!hasAttributeKey) attributes[attributeValue.name] = [];
        const attribute = attributes[attributeValue.name];
        const hasAttributeValue = attribute.includes(attributeValue.value);
        if (!hasAttributeValue) attribute.push(attributeValue.value);
      }
    }
    setAttributeOptions(attributes);
  };

  const updateAttributeOption = (
    attributeValues: Product["attributeValues"]
  ) => {
    const attributes: Record<string, string> = {}; // maps attribute name to value
    for (let attributeValue of attributeValues) {
      attributes[attributeValue.name] = attributeValue.value;
    }
    setAttributeOption(attributes);
  };

  return {
    product,
    attributeOptions,
    attributeOption,
    imageId,
    setImageId,
    isLoadingProduct,
    onChangeAttributeOption,
  };
};
