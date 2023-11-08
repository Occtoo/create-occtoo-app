import { DefaultService as OcctooDestinationClient } from "@/generated";
import { type Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const getProductById = async (id: string) => {
  const data = await OcctooDestinationClient.products({
    top: 1,
    filter: [
      {
        must: {
          id: [id],
        },
      },
    ],
    sortAsc: ["id"],
  });

  return data.results && data.results[0];
};

// Generate META data for SEO purposes
export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await getProductById(params.productId);

  return {
    title: product?.name,
    description: product?.description,
  };
}

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getProductById(params.productId);

  return (
    <section className="container">
      <div className="flex flex-wrap mb-24 -mx-4 py-4 md:py-6">
        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
          <Image
            src={product?.thumbnail?.replace("small", "large") || ""}
            alt={product?.id || "product image"}
            width={600}
            height={1000}
          />
        </div>
        <div className="w-full px-4 md:w-1/2">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="max-w-xl text-2xl font-bold leading-loose tracking-wide md:text-2xl">
                {product?.name}
              </h1>
              <p className="inline-block text-xl font-bold">
                <span>SEK.7,000.00</span>
                <span className="ml-3 text-base font-normal text-gray-500 line-through">
                  SEK.10,000.00
                </span>
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-lg font-bold">Description</h2>
              <div>{product?.description}</div>
            </div>
            <div className="flex flex-wrap items-center space-x-3 mb-6">
              <div className="lg:mb-0">
                <div className="w-28">
                  <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                      <span className="m-auto text-2xl font-thin">-</span>
                    </button>
                    <input
                      type="number"
                      className="flex items-center w-full font-semibold text-center placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                      placeholder="1"
                    />
                    <button className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="px-4 py-3 flex-grow h-10">
                Add to cart
              </Button>
            </div>
            <div className="flex gap-4 mb-6">
              <Button className="w-full h-10">Buy now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
