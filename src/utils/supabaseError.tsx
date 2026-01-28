import type { PostgrestError } from '@supabase/supabase-js'

export const handleSupabaseError = (
  error: PostgrestError | null
): void | never => {
  if (error) {
    console.error(error)
    throw error
  }
}