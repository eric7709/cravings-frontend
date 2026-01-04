export function getFullDateParts(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00"); // avoid timezone shift

  return {
    dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }), // Friday
    date: date.getDate(),                                            // 12
    month: date.toLocaleDateString("en-US", { month: "long" }),      // December
    year: date.getFullYear(),                                        // 2025
  };
}
