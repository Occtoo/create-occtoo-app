import { FilterProvider } from "./providers/FilterProvider";
import { Products } from "@/views";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Products />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <RouterProvider router={router} />
      </FilterProvider>
    </QueryClientProvider>
  );
};

export default App;
