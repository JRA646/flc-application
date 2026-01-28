export interface GenderBase {
  name: string
  description?: string | null
  is_active: boolean
}

export interface Gender extends GenderBase {
  id: string
  created_at: string
}

export type StoreGender = Omit<GenderBase, 'is_active'> & {
  is_active?: boolean
}

export type UpdateGender = Partial<GenderBase> & {
  id: string
}

export interface GenderFilters {
  keyword?: string
  isActive?: boolean
}