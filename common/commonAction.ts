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
