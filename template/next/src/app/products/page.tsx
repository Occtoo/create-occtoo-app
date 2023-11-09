import ReactQueryHydrate from "@/components/hydrate-client";
import getQueryClient from "@/lib/get-query-client";
import { dehydrate } from "@tanstack/react-query";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import { type Metadata, type ResolvingMetadata } from "next";
import { Suspense } from "react";
import { PAGE_SIZE } from "./constants";

/**
 * Import client generated from OpenAPI schema
 *
 * If you used a different destination url than the default one when scaffolding this project,
 * you should switch out the types here to fix any type errors.
 */
import {
  DefaultService as OcctooDestinationClient,
  type productsApiResponse,
} from "@/generated";

interface Props {
  searchParams: Record<string, string[]>;
}

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

  // Fetch products - hydrate client with data from server
  const queryClient = getQueryClient();

  /**
   * Use the generated client to fetch products
   *
   * If you used a different destination url than the default one when scaffolding this project,
   * you should switch out the client function here.
   */
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
