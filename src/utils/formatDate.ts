// 날짜 범위 포맷
export function formatDateRange(
  start: string | null,
  end: string | null,
): string | null {
  if (!start) return null;
  if (!end) return start;
  return `${start} ~ ${end}`;
}
