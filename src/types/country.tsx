export interface CountryBase {
  name: string
  official_name?: string | null
  iso_alpha2?: string | null
  iso_alpha3?: string | null
  iso_numeric?: string | null
  phone_code?: string | null
  capital?: string | null
  is_active: boolean,
  image_path : string
}

export interface Country extends CountryBase {
  id: string
  created_at: string
  updated_at: string
}

export type CountryInsert = Omit<Country, "id" | "created_at" | "updated_at">
export type CountryUpdate = Partial<CountryInsert>
