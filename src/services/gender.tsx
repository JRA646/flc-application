import { supabase } from '../supabaseClient'
import type { StoreGender, Gender } from '../types/gender'
import { handleSupabaseError } from '@/utils/supabaseError'

const TABLE_NAME = 'genders' as const

export const store = async (
  payload: StoreGender
): Promise<Gender> => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(payload)
    .select()
    .single()

  handleSupabaseError(error)
  return data
}
