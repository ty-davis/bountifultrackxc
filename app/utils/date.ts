export function formatDate(date: string, format: 'long' | 'short' = 'long'): string {
  if (!date) return '';
  const [year, month, day] = date.split('-').map(Number) as [number, number, number];
  const options: Intl.DateTimeFormatOptions = format === 'short'
    ? { year: 'numeric', month: 'short', day: 'numeric' }
    : { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(year, month - 1, day).toLocaleDateString('en-US', options);
}
