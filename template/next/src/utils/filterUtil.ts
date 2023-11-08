import { type Filters } from "@/providers/FilterProvider";
import { type ReadonlyURLSearchParams } from "next/navigation";

// Get filters from searchParams
export const getFilters = (searchParams: ReadonlyURLSearchParams) => {
  const filter = searchParams.get("filter");
  if (filter) {
    return JSON.parse(filter) as Filters;
  }
  return null;
};

// Remove filter value from searchParams
export const removeFilterValue = (
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string,
) => {
  const params = new URLSearchParams(searchParams);
  const filter = getFilters(searchParams);
  const filterValues = filter && filter[key];
  const updatedFilter = {
    ...filter,
    [key]: filterValues?.filter((v: string) => v !== value),
  };

  // remove query if empty
  if (updatedFilter && updatedFilter[key]?.length === 0) {
    delete updatedFilter[key];
  }

  // remove filter query if empty
  if (Object.keys(updatedFilter).length === 0) {
    params.set("page", "1");
    params.delete("filter");
    return params;
  }

  params.set("page", "1");
  params.set("filter", JSON.stringify(updatedFilter));
  return params;
};

// Add filter value to searchParams
export const addFilterValue = (
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string,
) => {
  const params = new URLSearchParams(searchParams);
  const filter = getFilters(searchParams);
  const filterValues = filter && filter[key];
  const updatedFilter = {
    ...filter,
    [key]: filterValues ? [...filterValues, value] : [value],
  };

  params.set("page", "1");
  params.set("filter", JSON.stringify(updatedFilter));
  return params;
};

// Check if filter is active
export const filterIsActive = (
  searchParams: ReadonlyURLSearchParams,
  key: string,
  value: string,
) => {
  const filter = getFilters(searchParams);
  const filterValues = filter && filter[key];
  return filterValues && filterValues.includes(value);
};
