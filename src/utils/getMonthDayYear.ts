export default function getMonthDayYear(theDate: string) {
  const date = new Date(theDate);
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}. ${day}, ${year}`;
}
