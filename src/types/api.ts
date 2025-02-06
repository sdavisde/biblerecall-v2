import { User } from '@supabase/supabase-js'

export type ApiContext = {
  user: User | null
}
