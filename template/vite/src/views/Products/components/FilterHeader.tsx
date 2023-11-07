import { useFilter } from "@/providers/FilterProvider";
import { AiOutlineClose } from "react-icons/ai";

const FilterHeader = () => {
  const { filters, removeFilter } = useFilter();

  // Get active filters
  const activeFilters = () => {
    return (
      filters &&
      Object.keys(filters).map((key) => ({
        key,
        values: filters[key],
      }))
    );
  };

  return (
    <div className="mb-4 pb-4">
      <div className="font-medium text-lg">Active filters:</div>
      {activeFilters()?.map((filter, index) => (
        <div className="flex flex-wrap items-center my-2" key={index}>
          <div className="text-sm font-medium capitalize">{filter.key}: </div>
          {filter.values.map((value, index) => (
            <div
              className="bg-gray-100 border pl-1 pr-2 py-0.5 ml-1 rounded cursor-pointer flex-shrink-0 hover:opacity-70 shadow-sm"
              key={index}
              onClick={() => removeFilter && removeFilter(filter.key, value)}
            >
              <div className="flex items-center text-gray-600 text-xs">
                <AiOutlineClose /> {value}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterHeader;
