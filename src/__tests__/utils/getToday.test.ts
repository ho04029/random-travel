import { describe, expect, it } from 'vitest';
import { getToday } from '@/utils/getToday';

describe('getToday', () => {
  it('YYYY-MM-DD 형식으로 반환한다', () => {
    expect(getToday()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('현재 날짜와 일치한다', () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    expect(getToday()).toBe(`${year}-${month}-${day}`);
  });
});
