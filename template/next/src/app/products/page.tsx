import ReactQueryHydrate from "@/components/hydrate-client";
import getQueryClient from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import ProductList from "./components/ProductList";
import {
  DefaultService as OcctooDestinationClient,
  productsApiResponse,
} from "@/generated";
import ProductFilter from "./components/ProductFilter";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import { PAGE_SIZE } from "./constants";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate META data for SEO purposes
export async function generateMetadata(
  { searchParams }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const filter =
    typeof searchParams.filter === "string"
      ? JSON.parse(searchParams.filter)
      : {};
  const category = filter.category;
  const color = filter.color;

  return {
    title: category?.join(", ") || "Products",
    description: `${color?.join(", ")} ${category?.join(", ")}`,
  };
}

export default async function Page({ searchParams }: Props) {
  const page =
    typeof searchParams.page === "string" ? parseInt(searchParams.page) : 1;
  const filter =
    typeof searchParams.filter === "string"
      ? JSON.parse(searchParams.filter)
      : {};

  /**
   * Fetch products
   * ? This is the same as in src/app/products/components/ProductList.tsx
   * ? but we are using the client directly instead of the react-query hook
   * ? to be able to use the prefetchQuery method
   *
   * ? This is needed to be able to use the ReactQueryHydrate component
   * ? to hydrate the client with the data from the server
   */
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery<productsApiResponse>({
    queryKey: ["products", page, filter],
    queryFn: () => {
      return OcctooDestinationClient.products({
        top: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        includeTotals: true,
        filter: [
          {
            must: filter,
          },
        ],
        sortAsc: ["id"],
      });
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <div className="container mx-auto md:flex items-start">
        <div className="w-full md:w-[350px] flex-shrink-0 py-4 md:py-6 md:sticky top-0">
          <ProductFilter />
        </div>
        <div className="w-full pb-10 py-4 md:py-6 space-y-6">
          {filter.category && (
            <div>
              <h1 className="text-2xl font-bold">{filter.category}</h1>
              <p>
                More meta about <strong>{filter.category}...</strong>
              </p>
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList page={page} filterQuery={filter} />
          </Suspense>
        </div>
      </div>
    </ReactQueryHydrate>
  );
}
