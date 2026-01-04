export function formatInstantToDate(instant?: string | null) {
  if (!instant) return "";

  const date = new Date(instant);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
