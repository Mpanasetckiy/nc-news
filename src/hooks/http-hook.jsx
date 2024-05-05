import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) {
          const err = new Error("Request failed");
          err.status = response.status;
          throw err;
        }
        const contentType = response.headers.get("content-type");

        if (contentType) {
          const responseData = await response.json();
          setIsLoading(false);
          return responseData;
        } else {
          setIsLoading(false);
          return {};
        }
      } catch (err) {
        setError(err);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  return { isLoading, error, sendRequest };
};
