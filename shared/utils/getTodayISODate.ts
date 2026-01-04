export const getTodayISODate = () =>
  new Date().toISOString().split("T")[0];
