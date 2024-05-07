import { createCaller } from 'server'
import { createContext } from 'server/context'

export const trpcServer = createCaller(createContext)
