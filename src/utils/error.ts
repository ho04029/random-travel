export const DEFAULT_ERROR_MESSAGE =
  '문제가 발생했습니다. 잠시 후 다시 시도해주세요';

const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: '이메일 또는 비밀번호가 올바르지 않습니다',
  email_exists: '이미 가입된 이메일입니다',
  weak_password: '비밀번호는 6자 이상이어야 합니다',
  rate_limit: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요',
  over_email_send_rate_limit:
    '이메일 요청이 너무 잦습니다. 잠시 후 다시 시도해주세요',
  user_already_exists: '이미 가입된 이메일입니다',
};

export function getErrorMessage(
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
): string {
  if (error && typeof error === 'object' && 'code' in error) {
    const code = (error as { code?: string }).code;
    if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
  }
  return fallback;
}

export function throwIfError(error: { message: string; code?: string } | null) {
  if (error) throw error;
}
