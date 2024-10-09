export type Error = {
  code: ErrorCode | string
  message?: string
}

export enum ErrorCode {
  VERSE_NOT_FOUND = 'VERSE_NOT_FOUND',
  VERSE_COOKIE_NOT_FOUND = 'VERSE_COOKIE_NOT_FOUND',
  USER_ID_NOT_PROVIDED = 'USER_ID_NOT_PROVIDED',
  VERSE_INFORMATION_NOT_PROVIDED = 'VERSE_INFORMATION_NOT_PROVIDED',
  VERSE_ID_NOT_PROVIDED = 'VERSE_ID_NOT_PROVIDED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_LOGGED_IN = 'NOT_LOGGED_IN',
  MALFORMED_SETTINGS = 'MALFORMED_SETTINGS',
  INVALID_VERSE = 'INVALID_VERSE',
  FAILED_TO_FETCH = 'FAILED_TO_FETCH',
}
