"use client";

import { productsApiResponse } from "@/generated";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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
