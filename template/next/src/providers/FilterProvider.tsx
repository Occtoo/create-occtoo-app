import React, { useContext, useState } from "react";

export interface IFilters {
  [key: string]: string[];
}

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
  filters: IFilters;
  setStaticFacets: (facets: IFacet[]) => void;
  setFacets: (facets: IFacet[]) => void;
  addFilter: (key: string, value: string) => void;
  setFiltersObj: (filters: IFilters) => void;
  removeFilter: (key: string, value: string) => void;
  clearFilters: () => void;
}

const FilterContext = React.createContext<Partial<IContext>>({} as IContext);

export const FilterProvider = ({ ...props }) => {
  const [staticFacets, setStaticFacets] = useState<IFacet[] | undefined>(
    undefined,
  );
  const [facets, setFacets] = useState<IFacet[] | undefined>(undefined);
  const [filters, setFilters] = useState<IFilters>({});

  const setFiltersObj = (filters: IFilters) => {
    setFilters(filters);
  };

  const addFilter = (key: string, value: string) => {
    setFilters((f) => ({ ...f, [key]: [...(f[key] || []), value] }));
  };

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
        setFiltersObj,
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
    throw new Error("'useData' must be used inside 'FilterProvider'");
  }

  return context;
};

export default FilterProvider;
