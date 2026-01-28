import { supabase } from "@/supabaseClient"

const TABLE = "states"

const STATE_SELECT = `
  id,
  country_id,
  name,
  code,
  is_active,
  created_at,
  updated_at
`
export const fetchStates = async (params?: {
  keyword?: string
  isActive?: boolean
  ids?: string[]
  countryId?: string
}) => {
  let query = supabase
    .from(TABLE)
    .select(STATE_SELECT)
    .order("name", { ascending: true })

  if (params?.ids?.length) {
    query = query.in("id", params.ids)
  }

  if (params?.countryId) {
    query = query.eq("country_id", params.countryId)
  }

  if (params?.keyword?.trim()) {
    const keyword = params.keyword.trim()

    query = query.or(
      `name.ilike.%${keyword}%,code.ilike.%${keyword}%`
    )
  }
  if (typeof params?.isActive === "boolean") {
    query = query.eq("is_active", params.isActive)
  }

  const { data, error } = await query

  if (error) {
    console.error("Supabase fetchStates error:", error)
    throw error
  }

  return data ?? []
}
