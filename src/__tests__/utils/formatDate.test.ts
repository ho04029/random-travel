import { describe, expect, it } from 'vitest';
import { formatDateRange } from '@/utils/formatDate';

describe('formatDateRange', () => {
  it('시작일이 없으면 null을 반환한다', () => {
    expect(formatDateRange(null, '2026-01-10')).toBeNull();
  });

  it('종료일이 없으면 시작일만 반환한다', () => {
    expect(formatDateRange('2026-01-10', null)).toBe('2026-01-10');
  });

  it('시작일과 종료일을 기호로 연결해 반환한다', () => {
    expect(formatDateRange('2026-01-10', '2026-01-15')).toBe(
      '2026-01-10 ~ 2026-01-15',
    );
  });
});
