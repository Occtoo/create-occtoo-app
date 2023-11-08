"use client";

import {
  HydrationBoundary as RQHydrate,
  type HydrationBoundaryProps,
} from "@tanstack/react-query";

function Hydrate(props: HydrationBoundaryProps) {
  return <RQHydrate {...props} />;
}

export default Hydrate;
