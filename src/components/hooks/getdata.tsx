import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

type UseAxiosFetchResult<T> = [boolean, T | null, AxiosError | null];

const useGetData = <T,>(url: string): UseAxiosFetchResult<T> => {
  const token = JSON.parse(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<T> = await axios.get(
          `https://test.globalmove.uz/api/${url}`,
          {
            headers: {
              Authorization: `Bearer ${token ? token : ""}`,
            },
          }
        );
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err as AxiosError);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [loading, data, error];
};

export default useGetData;
