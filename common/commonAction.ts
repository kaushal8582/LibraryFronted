export function formatMongoDate(mongoDate: Date | string, includeTime: boolean = false): string {
  const date = new Date(mongoDate);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  let formatted = `${day} ${month} ${year}`;

  if (includeTime) {
    const hours = date.getHours();
    const period = hours >= 12 ? 'pm' : 'am';
    const displayHour = hours % 12 || 12;
    formatted += ` ${displayHour}${period}`;
  }

  return formatted;
}


export function capitalizeFirstChar(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}


export function truncateText(text: string, limit: number): string {
  if (!text) return "";
  return text.length > limit ? text.slice(0, limit) + "..." : text;
}

export function convertToIndianTime(time24:string) {
  // time24 = "21:38"
  const [hour, minute] = time24.split(":").map(Number);

  let suffix = hour >= 12 ? "PM" : "AM";
  let hour12 = hour % 12;
  hour12 = hour12 === 0 ? 12 : hour12; // 0 → 12 fix

  return `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${suffix}`;
}
