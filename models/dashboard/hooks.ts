import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "@/shared/lib/axios";
import {
  DashboardTodayStatsResponse,
  DashboardOverviewResponse,
  DashboardParams,
} from "./types"
import { useDashboardStore } from "./store";
import { Order} from "../orders/types";

const fetchDashboardStats = async (
  startDate: string | null,
  endDate: string | null
): Promise<DashboardTodayStatsResponse> => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const { data } = await api.get<DashboardTodayStatsResponse>("/dashboard/stats", {
    params,
  });
  return data;
};

export const fetchDashboardOverview = async (
  params: DashboardParams): Promise<DashboardOverviewResponse> => {
  const { data } = await api.get("/dashboard/overview", {
    params,
  });
  return data;
};

export const fetchLastOrders = async (): Promise<Order[]> => {
  const { data } = await api.get("/dashboard/orders");
  return data;
};


export const useDashboardOverview = () => {
  const { startDate, endDate, setOverview } = useDashboardStore();
  const query = useQuery({
    queryKey: ["dashboard-overview", startDate, endDate],
    queryFn: async () => {
      const data = await fetchDashboardOverview({ startDate, endDate });
      return data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query.data) {
      setOverview(query.data);
    }
  }, [query.data, setOverview]);

  return query;
};


export const useDashboardStats = () => {
  const { startDate, endDate, setStats } = useDashboardStore();
  const query = useQuery<DashboardTodayStatsResponse>({
    queryKey: ["dashboardStats", startDate, endDate],
    queryFn: async () => {
      const data = await fetchDashboardStats(startDate, endDate);
      return data;
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query.data) {
      setStats(query.data);
    }
  }, [query.data, setStats]);

  return query;
};


export const useLastOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["dashboard", "last-orders"],
    queryFn: fetchLastOrders,
    staleTime: 1000 * 30, // 30 seconds 🕒
    refetchOnWindowFocus: false,
  });
};