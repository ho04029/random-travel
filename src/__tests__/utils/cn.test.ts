import { describe, expect, it } from 'vitest';
import { cn } from '@/utils/cn';

describe('cn', () => {
  it('falsy 값은 제거하고 문자열만 병합한다', () => {
    expect(cn('a', false, 'b', undefined, null, 0, 'c')).toBe('a b c');
  });

  it('조건부 클래스를 처리한다', () => {
    const isActive = true;
    expect(cn('base', isActive && 'active', !isActive && 'inactive')).toBe(
      'base active',
    );
  });

  it('tailwind-merge로 충돌하는 클래스를 뒤쪽 값으로 해소한다', () => {
    expect(cn('px-2', 'px-3')).toBe('px-3');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });

  it('객체 구문을 처리한다', () => {
    expect(cn({ 'bg-blue-500': true, 'bg-red-500': false })).toBe(
      'bg-blue-500',
    );
  });
});
