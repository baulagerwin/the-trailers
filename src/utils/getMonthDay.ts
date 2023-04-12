export default function (dateString: string) {
  const date = new Date(dateString);
  const monthAbbreviation = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  return `${monthAbbreviation} ${day}`;
}
