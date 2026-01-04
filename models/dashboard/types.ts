export type StatCard = {
  value: number;
  percentageChange: number;
};

export type DashboardTodayStatsResponse = {
  todaysOrders: StatCard;
  pendingOrders: StatCard;
  completedOrders: StatCard;
  cancelledOrders: StatCard;
  totalRevenue: StatCard;
};

export type DashboardOverviewResponse = {
  topMenuItems: {
    name: string;
    totalQuantity: number;
    totalSales: number;
  }[];
  topCategories: {
    category: string;
    totalQuantity: number;
    totalSales: number;
  }[];
  topTables: {
    tableNumber: string;
    orderCount: number;
    totalSales: number;
  }[];
};

export type DashboardParams = {
  startDate: string | null;
  endDate: string |null;
};


export type DashboardStore = {
  startDate: string;
  hasHydrated: boolean
  endDate: string;
  overview: DashboardOverviewResponse | null
  stats: DashboardTodayStatsResponse | null; // store matches backend type
  setOverview: (overview: DashboardOverviewResponse) => void
  setStats: (stats: DashboardTodayStatsResponse) => void;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
};


