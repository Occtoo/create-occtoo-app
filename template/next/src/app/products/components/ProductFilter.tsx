"use client";

import { useFilter } from "@/providers/FilterProvider";
import FacetGroup from "./FacetGroup";
import FilterHeader from "./FilterHeader";

const ProductFilter = () => {
  const { facets } = useFilter();

  return (
    <div className="space-y-6">
      <FilterHeader />
      <div className="space-y-6">
        {facets?.map(
          (facet) =>
            facet.header &&
            facet.propertyId &&
            facet.values && (
              <FacetGroup
                key={facet.propertyId}
                header={facet.propertyId}
                facetKey={facet.propertyId!}
                values={facet.values}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
