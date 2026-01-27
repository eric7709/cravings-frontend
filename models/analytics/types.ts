export type Analytics = {
  summary: { totalOrders: number; totalRevenue: number };
  shifts: { shiftName: string; orders: number; revenue: number }[];
  days: { dayIndex: number; orders: number; revenue: number }[];
  menuItems: { name: string; quantity: number; revenue: number }[];
  categories: { name: string; quantity: number; revenue: number }[];
  waiters: { name: string; orders: number; revenue: number }[];
  cashiers: { name: string; processed: number; revenue: number }[];
  tables: { tableName: string; uses: number; revenue: number }[];
  customers: { name: string; visits: number; totalSpent: number }[];
};

export type AnalyticsStore = {
  analytics: Analytics | null;
  isLoading: boolean;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setAnalytics: (data: Analytics) => void;
  setLoading: (loading: boolean) => void;
  reset: (data: Analytics) => void;
};
