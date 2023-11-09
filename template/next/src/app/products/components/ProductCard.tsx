"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * Import response type generated from OpenAPI schema
 *
 * If you used a different destination url than the default one when scaffolding this project,
 * you should switch out the type here to fix any type errors.
 */
import { type productsApiResponse } from "@/generated";

type Increment<A extends number[]> = [...A, 0];

type DeepRequired<
  T,
  D extends number = -1,
  R extends number[] = [],
> = T extends object
  ? R["length"] extends D
    ? T
    : {
        [K in keyof T]-?: DeepRequired<T[K], D, Increment<R>>;
      }
  : T;

// Get the type of the product response
type Product = DeepRequired<productsApiResponse, 2>["results"][number];

interface IProductCard {
  data: Product;
}

/**
 * If you used a different destination url than the default one when scaffolding this project,
 * you should switch out the type above and update the client function below to fix any type errors.
 */
const ProductCard: React.FC<IProductCard> = ({ data }) => {
  const router = useRouter();

  return (
    <div
      className="mx-auto w-full flex flex-col items-center justify-start bg-white overflow-hidden hover:opacity-90 transition-opacity cursor-pointer"
      onClick={() => router.push(`/products/${data.id}`)}
    >
      <div className="max-h-[400px] w-full flex items-center justify-center mb-2">
        <Image
          className="max-w-full max-h-full"
          src={data.thumbnail || ""}
          alt={data.id || "Product image"}
          width={300}
          height={400}
        />
      </div>

      <div className="w-full px-2">
        <div className="font-bold">{data.title}</div>
        <div className="text-sm text-gray-500">{data.id}</div>
      </div>
    </div>
  );
};

export default ProductCard;
