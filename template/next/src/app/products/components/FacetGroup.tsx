import { useFilter } from "@/providers/FilterProvider";
import {
  addFilterValue,
  filterIsActive,
  removeFilterValue,
} from "@/utils/filterUtil";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface IFacetGroup {
  header: string;
  facetKey: string;
  values: {
    key?: string | undefined;
    count?: number | undefined;
  }[];
}

const FacetGroup: React.FC<IFacetGroup> = ({ header, facetKey, values }) => {
  const { facets } = useFilter();
  const searchParams = useSearchParams();
  const router = useRouter();

  /**
   * * Toggle filter value
   * @param key
   * @param value
   */
  const toggleFilter = useCallback(
    (key?: string, value?: string) => {
      const params = filterIsActive(searchParams, key || "", value || "")
        ? removeFilterValue(searchParams, key || "", value || "")
        : addFilterValue(searchParams, key || "", value || "");

      router.replace("/products?" + params, { scroll: false });
    },
    [searchParams, router],
  );

  /**
   * * Get filter count (available products for filter)
   * @param key
   * @returns Number of available products for filter
   */
  const filterCount = (key: string | undefined) => {
    return (
      facets
        ?.find((f) => f.propertyId === facetKey)
        ?.values?.find((v) => v.key === key)?.count || 0
    );
  };

  return (
    <div>
      <div className="font-medium text-md capitalize pb-1">
        {header?.split("|").pop()}
      </div>
      {values?.map((value) => (
        <div
          key={value.key}
          className={`flex flex-wrap items-center my-2 cursor-pointer text-sm`}
          onClick={() => toggleFilter(facetKey, value.key)}
        >
          <div
            className={`h-[15px] w-[15px] rounded border mr-2 ${
              filterIsActive(searchParams, facetKey || "", value.key || "")
                ? "bg-black"
                : ""
            }`}
          />
          {value.key} ({filterCount(value.key)})
        </div>
      ))}
    </div>
  );
};

export default FacetGroup;
