import { Result } from '@util/result'

/**
 * Used to provide a single API that we use to pass messages or errors back to the frontend after a server action fails
 */
export type FormActionState = Result<{
  message: string
}> | null

type RootErrorProps = { state: FormActionState }
export function RootError({ state }: RootErrorProps) {
  if (!state || state.hasValue) {
    return <></>
  }

  return <p className='text-destructive text-center'>{state.error.message}</p>
}
