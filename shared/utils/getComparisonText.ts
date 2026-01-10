import { differenceInCalendarDays, isSameWeek, isSameMonth, isSameYear, subWeeks, subMonths, subYears } from "date-fns";

export function getComparisonText(startDateStr: string, endDateStr: string) {
  if (!startDateStr || !endDateStr) return "";

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  // single day
  if (startDateStr === endDateStr) return "Compared to previous day";

  const diffDays = differenceInCalendarDays(end, start) + 1;

  // check for week alignment
  const prevWeekStart = subWeeks(start, 1);
  const prevWeekEnd = subWeeks(end, 1);
  if (diffDays >= 7 && isSameWeek(start, end) && isSameWeek(prevWeekStart, prevWeekEnd)) {
    return "Compared to last week";
  }

  // check for month alignment
  const prevMonthStart = subMonths(start, 1);
  const prevMonthEnd = subMonths(end, 1);
  if (isSameMonth(start, end) && isSameMonth(prevMonthStart, prevMonthEnd)) {
    return "Compared to last month";
  }

  // check for year alignment
  if (isSameYear(start, end) && isSameYear(subYears(start, 1), subYears(end, 1))) {
    return "Compared to last year";
  }

  // fallback for generic range
  return `Compared to previous ${diffDays} day${diffDays > 1 ? "s" : ""}`;
}
