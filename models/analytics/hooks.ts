import { useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Analytics } from "./types";
import api from "@/shared/lib/axios";
import { useAnalyticsStore } from "./store";

export const useAnalytics = () => {
  const { 
    startDate, 
    endDate, 
    setAnalytics, 
    setLoading 
  } = useAnalyticsStore();

  const query = useQuery({
    // 1. Flattened queryKey
    queryKey: ["analytics", startDate, endDate],
    
    queryFn: async (): Promise<Analytics> => {
      const { data } = await api.get<Analytics>("/analytics", {
        params: { 
          startDate, 
          endDate 
        },
      });
      return data;
    },
    
    placeholderData: keepPreviousData,
    staleTime: 0, 
  });

  // Sync Global Loading State
  useEffect(() => {
    setLoading(query.isLoading);
  }, [query.isLoading, setLoading]);

  // Sync Data
  useEffect(() => {
    if (query.data) {
      setAnalytics(query.data);
    }
  }, [query.data, setAnalytics]);

  return query;
};
