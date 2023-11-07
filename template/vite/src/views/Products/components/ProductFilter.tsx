import { useFilter } from "@/providers/FilterProvider";
import FilterGroup from "./FilterGroup";
import FilterHeader from "./FilterHeader";

const ProductFilter = ({ isLoading }: { isLoading: boolean }) => {
  // Use filters from context
  const { staticFacets } = useFilter();

  return (
    <div className="" style={{ opacity: isLoading ? 0.3 : 1 }}>
      <FilterHeader />
      {staticFacets?.map(
        (facet, index) =>
          facet.header &&
          facet.propertyId &&
          facet.values && (
            <FilterGroup
              key={index}
              header={facet.propertyId}
              facetKey={facet.propertyId!}
              values={facet.values}
            />
          ),
      )}
    </div>
  );
};

export default ProductFilter;
