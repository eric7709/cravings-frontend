import { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, subWeeks, subMonths, subYears, formatISO } from "date-fns";

export function getRangeDates(option: string) {
  const today = new Date();
  let start: Date, end: Date;

  switch (option) {
    case "Today":
      start = end = today;
      break;
    case "Yesterday":
      start = end = subDays(today, 1);
      break;
    case "This Week":
      start = startOfWeek(today, { weekStartsOn: 1 }); // Monday
      end = endOfWeek(today, { weekStartsOn: 1 });
      break;
    case "Last Week":
      start = startOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      end = endOfWeek(subWeeks(today, 1), { weekStartsOn: 1 });
      break;
    case "This Month":
      start = startOfMonth(today);
      end = endOfMonth(today);
      break;
    case "Last Month":
      start = startOfMonth(subMonths(today, 1));
      end = endOfMonth(subMonths(today, 1));
      break;
    case "This Year":
      start = startOfYear(today);
      end = endOfYear(today);
      break;
    case "Last Year":
      start = startOfYear(subYears(today, 1));
      end = endOfYear(subYears(today, 1));
      break;
    default:
      start = end = today;
  }

  return {
    startDate: formatISO(start, { representation: "date" }),
    endDate: formatISO(end, { representation: "date" }),
  };
}
