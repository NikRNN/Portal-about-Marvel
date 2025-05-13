import { useState, useCallback } from "react";

export const useHttp = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = useCallback(
    async (
      url,
      method = "GET",
      body = null
      // headers = { "Content-Type": "application/json" }
    ) => {
      setLoading(true);

      try {
        const res = await fetch(url, {
          method,
          body,
          // headers
        });

        if (!res.ok) {
          throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        const data = await res.json();

        setLoading(false);

        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(false);
  }, []);

  return { loading, error, setError, request, clearError };
};
