import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "@/providers/FilterProvider";
import { AiOutlineLoading } from "react-icons/ai";
import ProductFilter from "./components/ProductFilter";
import ProductCard from "./components/ProductCard";

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

// Pagination size
const PAGE_SIZE = 16;

const Products = () => {
  // Get filters from context
  const { filters, staticFacets, setStaticFacets, setFacets } = useFilter();

  // Pagination
  const [page, setPage] = useState(0);

  // Products
  const [products, setProducts] = useState<productsApiResponse["results"]>([]);

  /**
   * Use the generated client to fetch products
   *
   * If you used a different destination url than the default one when scaffolding this project,
   * you should switch out the client function here.
   */
  const { data, isLoading, isError, isRefetching } =
    useQuery<productsApiResponse>(
      ["products", page, filters],
      () =>
        OcctooDestinationClient.products({
          top: PAGE_SIZE,
          skip: page * PAGE_SIZE,
          includeTotals: true,
          filter: [
            {
              must: filters,
            },
          ],
        }),
      {
        keepPreviousData: true,
        onSuccess(data) {
          setFacets && data.facets && setFacets(data.facets);
          !staticFacets &&
            setStaticFacets &&
            data.facets &&
            setStaticFacets(data.facets);
          setProducts((products) =>
            page === 0
              ? data.results
              : products && data.results
              ? [...products, ...data.results]
              : data.results,
          );
        },
      },
    );

  // Reset page on filter change
  useEffect(() => {
    setPage(0);
  }, [filters]);

  // Paginate query
  const fetchMore = () => {
    setPage((page) => page + 1);
  };

  // Handle error
  if (isError)
    return (
      <div className="text-xs p-4">
        <p>
          Oops. Something went wrong. Please check comments in &nbsp;
          <code className="font-mono font-bold">
            src/app/products/page.tsx
          </code>{" "}
          or open an issue on{" "}
          <a
            href="https://github.com/Occtoo/create-occtoo-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.
          </a>
        </p>
      </div>
    );

  // Render
  return (
    <div className="md:flex items-start">
      <div className="w-full md:w-[350px] flex-shrink-0 p-4 md:p-6 md:sticky top-0">
        <div className="flex items-center font-medium mb-6">
          <img src="/occtoo.webp" className="mr-2 w-5 h-5" />
          <div>Occtoo Demo</div>
        </div>
        <ProductFilter isLoading={isLoading || isRefetching} />
      </div>

      {data && products && (
        <div
          className={`w-full pb-10 ${
            isLoading || isRefetching ? "opacity-50" : ""
          }`}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gridGap: 25,
            }}
            className="p-4 md:p-6"
          >
            {products?.map((p, index) => (
              <ProductCard
                key={index}
                data={{
                  id: p.id || "",
                  title: p.name || "",
                  subTitle: p.id || "",
                  imageSrc: p.thumbnail || "",
                }}
              />
            ))}
          </div>
          {(data.total || 0) > (products.length || 0) && (
            <div className="px-6">
              <div
                className="shadow-lg flex items-center justify-center border rounded-md p-2 bg-black text-white hover:bg-black/80 cursor-pointer mt-6 mb-3 mx-auto w-full md:max-w-[200px] font-medium text-sm"
                onClick={() => fetchMore()}
              >
                {(isLoading || isRefetching) && (
                  <AiOutlineLoading className="mr-2 h-3 w-3 animate-spin" />
                )}
                Load more
              </div>
              <div className="text-center text-sm text-gray-500">
                Showing {products.length} of {data.total || 0} products
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
