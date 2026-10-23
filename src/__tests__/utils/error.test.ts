import { describe, expect, it } from 'vitest';
import {
  DEFAULT_ERROR_MESSAGE,
  getErrorMessage,
  throwIfError,
} from '@/utils/error';

describe('getErrorMessage', () => {
  it('알려진 코드면 대응 메시지를 반환한다', () => {
    expect(getErrorMessage({ code: 'invalid_credentials' })).toBe(
      '이메일 또는 비밀번호가 올바르지 않습니다',
    );
    expect(getErrorMessage({ code: 'email_exists' })).toBe(
      '이미 가입된 이메일입니다',
    );
    expect(getErrorMessage({ code: 'weak_password' })).toBe(
      '비밀번호는 6자 이상이어야 합니다',
    );
    expect(getErrorMessage({ code: 'rate_limit' })).toBe(
      '요청이 너무 많습니다. 잠시 후 다시 시도해주세요',
    );
  });

  it('알 수 없는 코드면 기본 fallback을 반환한다', () => {
    expect(getErrorMessage({ code: 'unknown_code' })).toBe(
      DEFAULT_ERROR_MESSAGE,
    );
  });

  it('커스텀 fallback을 지원한다', () => {
    expect(getErrorMessage({ code: 'unknown_code' }, '커스텀 메시지')).toBe(
      '커스텀 메시지',
    );
  });

  it('null, undefined, 원시값이면 fallback을 반환한다', () => {
    expect(getErrorMessage(null)).toBe(DEFAULT_ERROR_MESSAGE);
    expect(getErrorMessage(undefined)).toBe(DEFAULT_ERROR_MESSAGE);
    expect(getErrorMessage('string error')).toBe(DEFAULT_ERROR_MESSAGE);
  });
});

describe('throwIfError', () => {
  it('error가 없으면 아무것도 하지 않는다', () => {
    expect(() => throwIfError(null)).not.toThrow();
  });

  it('error가 있으면 해당 에러를 던진다', () => {
    const error = { message: 'boom', code: 'unknown_code' };
    expect(() => throwIfError(error)).toThrowError('boom');
    try {
      throwIfError(error);
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
