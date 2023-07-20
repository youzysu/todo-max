import { useCallback, useEffect, useState } from "react";
import { http } from "utils/http";

interface UseFetchProps<T = Record<string, unknown>> {
  url: string;
  method: "get" | "post" | "delete" | "put" | "patch";
  body?: T;
  autoFetch?: boolean;
}

export const useFetch = <T extends Record<string, unknown>>({
  url,
  method,
  body,
  autoFetch = false,
}: UseFetchProps<T>): {
  response: any;
  errorMsg: string;
  loading: boolean;
  fetch: () => Promise<void>;
} => {
  const [response, setResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await http[method](url, body);
      setResponse(res);
    } catch (error) {
      if (error instanceof Error) {
        console.error("HTTP Error: ", error.message);
        setErrorMsg(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, body]);

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, [url, method, body, autoFetch]);

  return { response, errorMsg, loading, fetch };
};
