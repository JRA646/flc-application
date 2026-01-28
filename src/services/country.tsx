import { supabase } from "@/supabaseClient"

const TABLE = "countries"

/* =========================
   Select fields (optional)
========================= */
// keep "*" for now, but this lets you optimize later
const COUNTRY_SELECT = `
  id,
  name,
  official_name,
  iso_alpha2,
  iso_alpha3,
  iso_numeric,
  phone_code,
  capital,
  is_active,
  created_at,
  updated_at,
  image_path
`

/* =========================
   Fetch countries
========================= */
export const fetchCountries = async (params?: {
  keyword?: string
  isActive?: boolean
  ids?: string[]
}) => {
  let query = supabase
    .from(TABLE)
    .select(COUNTRY_SELECT)
    .order("name", { ascending: true })

  /* =========================
     Filter by IDs
  ========================= */
  if (params?.ids?.length) {
    query = query.in("id", params.ids)
  }

  /* =========================
     Keyword search
     (name OR official_name OR ISO codes)
  ========================= */
  if (params?.keyword?.trim()) {
    const keyword = params.keyword.trim()

  query = query.or(
    `name.ilike.%${keyword}%,official_name.ilike.%${keyword}%,iso_alpha2.ilike.%${keyword}%,iso_alpha3.ilike.%${keyword}%,iso_numeric.ilike.%${keyword}%,capital.ilike.%${keyword}%`
  )
  }

  /* =========================
     Active filter
  ========================= */
  if (typeof params?.isActive === "boolean") {
    query = query.eq("is_active", params.isActive)
  }

  const { data, error } = await query

  if (error) {
    console.error("Supabase fetchCountries error:", error)
    throw error
  }

  return data ?? []
}


export function getCountyImageUrl(
  path?: string | null,
  fallback = "/images/campus-placeholder.png"
): string {
  if (!path) return fallback;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(path);

  return data?.publicUrl ?? fallback;
}