/* =========================
   Base (shared fields)
========================= */
export interface MinistryBase {
  name: string;
  code?: string | null;
  description?: string | null;
}

/* =========================
   Full DB row
========================= */
export interface Ministry extends MinistryBase {
  id: string;
  created_at: string;
}

/* =========================
   Create / Store
========================= */
export type StoreMinistry = MinistryBase;

/* =========================
   Update
========================= */
export type UpdateMinistry = Partial<MinistryBase> & {
  id: string;
};

/* =========================
   Filters / Queries
========================= */
export interface MinistryFilters {
  keyword?: string;
}
