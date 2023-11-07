import { useFilter } from "@/providers/FilterProvider";

interface IFilterGroup {
  header: string;
  facetKey: string;
  values: {
    key?: string | undefined;
    count?: number | undefined;
  }[];
}

const FilterGroup: React.FC<IFilterGroup> = ({ header, facetKey, values }) => {
  // Get filters from context
  const { filters, addFilter, removeFilter, facets } = useFilter();

  // Toggle filter
  const toggleFilter = (key?: string, value?: string) => {
    if (!key || !value || !addFilter || !removeFilter) return;

    if (filters && filters[key] && filters[key].includes(value)) {
      removeFilter(key, value);
      return;
    }

    addFilter(key, value);
  };

  // Checks if filter is active
  const isActive = (key: string, value: string) => {
    return !!(filters && filters[key] && filters[key].includes(value));
  };

  // Checks if filter is disabled
  const isDisabled = (key: string, value?: string) => {
    if (!value || !facets) return true;

    const facet = facets.find((f) => f.propertyId === key);
    if (!facet) return true;

    const facetValue = facet.values?.find((v) => v.key === value);
    if (!facetValue) return true;

    return facetValue.count === 0;
  };

  // Get filter count (available products for filter)
  const filterCount = (key: string | undefined) => {
    return (
      facets
        ?.find((f) => f.propertyId === facetKey)
        ?.values?.find((v) => v.key === key)?.count || 0
    );
  };

  return (
    <>
      <div className="mb-4">
        <div className="font-medium text-md capitalize border-b pb-1">
          {header?.split("|").pop()}
        </div>
        {values?.map((value, index) => (
          <div
            className={`flex flex-wrap items-center my-2 cursor-pointer text-sm ${
              isDisabled(facetKey, value.key) ? "opacity-30" : ""
            }`}
            key={index}
            onClick={() =>
              !isDisabled(facetKey, value.key) &&
              toggleFilter(facetKey, value.key)
            }
          >
            <div
              className={`h-[15px] w-[15px] rounded border mr-2 ${
                isActive(facetKey || "", value.key || "") ? "bg-black" : ""
              }`}
            />
            {value.key} ({filterCount(value.key)})
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterGroup;
