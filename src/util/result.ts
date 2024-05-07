import { Error } from './error'

type Success<T> = {
  type: ResultType.Success
  hasValue: true
  value: T
}

type Failure = {
  type: ResultType.Failure
  hasValue: false
  error: Required<Error>
}

export enum ResultType {
  Success = 'success',
  Failure = 'failure',
}

export type Result<T> = Success<T> | Failure
export type AsyncResult<T> = Awaited<Result<T>>

export namespace Result {
  export function success<T>(val: T): Success<T> {
    return { type: ResultType.Success, hasValue: true, value: val }
  }

  export function failure(error: Error): Failure {
    return {
      type: ResultType.Failure,
      hasValue: false,
      error: {
        ...error,
        message: error.message ?? error.code,
      },
    }
  }
}
