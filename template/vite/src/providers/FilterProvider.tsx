import React, { useContext, useState } from "react";

type Filters = Record<string, string[]>;

export interface IFacet {
  propertyId?: string | undefined;
  header?: string | undefined;
  values?:
    | {
        key?: string | undefined;
        count?: number | undefined;
      }[]
    | undefined;
}

interface IContext {
  staticFacets: IFacet[] | undefined;
  facets: IFacet[] | undefined;
  filters: Filters;
  setStaticFacets: (facets: IFacet[]) => void;
  setFacets: (facets: IFacet[]) => void;
  addFilter: (key: string, value: string) => void;
  removeFilter: (key: string, value: string) => void;
  clearFilters: () => void;
}

const FilterContext = React.createContext<Partial<IContext>>({} as IContext);

export const FilterProvider = ({ ...props }) => {
  // Static facets (used to render filter groups)
  const [staticFacets, setStaticFacets] = useState<IFacet[] | undefined>(
    undefined,
  );

  // Facets (used to decide which facets to disable)
  const [facets, setFacets] = useState<IFacet[] | undefined>(undefined);

  // Filters (used for queries)
  const [filters, setFilters] = useState<Filters>({});

  // Add filter
  const addFilter = (key: string, value: string) => {
    setFilters((f) => ({ ...f, [key]: [...(f[key] || []), value] }));
  };

  // Remove filter
  const removeFilter = (key: string, value: string) => {
    // concat value to existing entry
    if (filters[key] && filters[key].length > 1) {
      setFilters((f) => ({ ...f, [key]: f[key].filter((v) => v !== value) }));
      return;
    }

    // clean up empty entries
    const { [key]: _, ...rest } = filters;
    setFilters(rest);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({});
  };

  return (
    <FilterContext.Provider
      value={{
        filters,
        staticFacets,
        setStaticFacets,
        facets,
        setFacets,
        addFilter,
        removeFilter,
        clearFilters,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("'useFilter' must be used inside 'FilterProvider'");
  }

  return context;
};

export default FilterProvider;
