"use client";

import { AiOutlineLoading } from "react-icons/ai";
import {
  DefaultService as OcctooDestinationClient,
  type productsApiResponse,
} from "@/generated";
import { type Filters, useFilter } from "@/providers/FilterProvider";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { PAGE_SIZE } from "../constants";

export default function ProductList({
  page,
  filterQuery,
}: {
  page: number;
  filterQuery: Filters | undefined;
}) {
  const router = useRouter();
  const { setFacets } = useFilter();
  const searchParams = useSearchParams();

  // Fetch products
  const { data, isLoading, isError, isFetched, isFetching } =
    useQuery<productsApiResponse>({
      queryKey: ["products", page, filterQuery],
      queryFn: () => {
        return OcctooDestinationClient.products({
          top: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
          includeTotals: true,
          filter: [
            {
              must: filterQuery,
            },
          ],
          sortAsc: ["id"],
        });
      },
    });

  const [products, setProducts] = useState<productsApiResponse["results"]>(
    data?.results || [],
  );
  const [fetchedPages, setFetchedPages] = useState<number[]>([page]);
  const [isPrevousQuery, setIsPreviousQuery] = useState(false);

  const filterParams = searchParams.get("filter");

  // Reset page on filter change
  useEffect(() => {
    // const filterQuery = new URLSearchParams(searchParams).get('filter');
    setProducts([]);
    setFetchedPages([page]);
  }, [filterParams]);

  // Update products on data change
  useEffect(() => {
    if (data) {
      setFacets && data?.facets && setFacets(data.facets);
      updateProducts(data.results);
    }
  }, [data, isFetched, isLoading, page, setFacets]);

  // Update products
  const updateProducts = (productRes: productsApiResponse["results"]) => {
    if (page === 0) {
      setProducts(productRes);
      return;
    }

    if (productRes) {
      if (isPrevousQuery) {
        setProducts(
          (products) =>
            (products && [...productRes, ...products]) || productRes,
        );
      } else {
        setProducts(
          (products) =>
            (products && [...products, ...productRes]) || productRes,
        );
      }
      return;
    }

    setProducts(productRes);
  };

  // Fetch more products
  const fetchMore = () => {
    setIsPreviousQuery(false);
    const nextPage = fetchedPages.includes(page + 1)
      ? (fetchedPages.at(-1) || 0) + 1
      : page + 1;
    const params = new URLSearchParams(searchParams);

    if (!fetchedPages.includes(nextPage)) {
      setFetchedPages((fetchedPages) => [...fetchedPages, nextPage]);
    }

    params.set("page", nextPage.toString());
    router.replace("/products" + "?" + params.toString(), { scroll: false });
  };

  // Fetch previous products
  const fetchPrevious = () => {
    setIsPreviousQuery(true);
    const previousPage = fetchedPages.includes(page - 1)
      ? (fetchedPages[0] || 0) - 1
      : page - 1;
    const params = new URLSearchParams(searchParams);

    setFetchedPages((fetchedPages) => [previousPage, ...fetchedPages]);
    params.set("page", previousPage.toString());
    router.replace("/products" + "?" + params.toString(), { scroll: false });
  };

  // Check if previous page is available
  const hasPreviousPage = () => {
    const previousPage = fetchedPages[0] === 1 ? 1 : fetchedPages[0] - 1;
    return page > 1 && !fetchedPages.includes(previousPage);
  };

  // Check if next page is available
  const hasNextPage = () => {
    const totalProducts = data?.total || 0;
    const numberOfPages = Math.ceil(totalProducts / PAGE_SIZE);
    const isLastPage = fetchedPages[fetchedPages.length - 1] === numberOfPages;
    return !isLastPage;
  };

  if (isError) return <div>Error!</div>;

  return (
    <div className={`${isLoading ? "opacity-50" : ""}`}>
      {hasPreviousPage() && (
        <div className="px-6 flex flex-col items-center justify-center">
          <Button
            variant="outline"
            onClick={() => fetchPrevious()}
            className="mb-4 w-full md:max-w-[200px]"
            disabled={isLoading || isFetching}
          >
            {(isLoading || isFetching) && (
              <AiOutlineLoading className="mr-2 h-3 w-3 animate-spin" />
            )}
            Load previous
          </Button>
        </div>
      )}
      <div className="text-muted-foreground text-sm py-3">
        {data?.total} products
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((p) => <ProductCard key={p.id} data={p} />)}
      </div>
      {hasNextPage() && (
        <div className="px-6 flex flex-col items-center justify-center">
          <div className="text-center text-sm text-gray-500 mt-6 mb-2">
            Showing {products?.length} of {data?.total || 0} products
          </div>
          <Button
            variant="outline"
            onClick={() => fetchMore()}
            className="w-full md:max-w-[200px]"
            disabled={isLoading || isFetching}
          >
            {isFetching && (
              <AiOutlineLoading className="mr-2 h-3 w-3 animate-spin" />
            )}
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
