import { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = (url, dep = null) => {
  const { user } = useAuthContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: user?.token ? `Bearer ${user.token}` : undefined,
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
      setError(null);
    } catch (err) {
      console.error("useFetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, user?.token]);

  useEffect(() => {
    fetchData();
  }, [fetchData, dep]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
