import { useState, useEffect } from "react";
import { type ApiError } from "@/generated";

export function useQuery<T>({
  query,
  onComplete,
}: {
  query: any;
  onComplete?: (res: T) => void;
}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await query;
      setLoading(false);
      setData(data);
      console.log(data);
      onComplete && onComplete(data);
    };

    fetchData().catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  return { data, loading, error };
}
