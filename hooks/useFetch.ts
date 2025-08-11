import { useCallback, useEffect, useMemo, useState } from "react";

type UseFetchProps = {
  url: string;
  limit?: number;
};

type UseFetchResult<T> = {
  data?: T;
  error?: string;
  loading: boolean;
  refetch: () => void;
};

const useFetch = <T>({ url, limit }: UseFetchProps): UseFetchResult<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(undefined);
    setData(undefined);
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((resData) => setData(resData as T))
      .catch((err) => {
        const { stack, message } = err as Error;
        setError(stack ?? message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort("Component unmounted");
  }, [version]);

  const refetch = useCallback(() => setVersion((current) => current + 1), []);

  return useMemo(() => ({ data, error, loading, refetch }), [data, error, loading, refetch]);
};

export default useFetch;
