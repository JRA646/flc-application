import type { Country } from "./country";

/* =========================
   Base (shared fields)
========================= */
export interface StateBase {
  name: string;
  code?: string | null;
  country: Country;
}

/* =========================
   Full DB row
========================= */
export interface State extends StateBase {
  id: string;
  created_at: string;
}

/* =========================
   Create / Store
========================= */
export type StoreState = StateBase;
/* =========================
   Update
========================= */
export type UpdateState = Partial<StateBase> & {
  id: string;
};

/* =========================
   Filters / Queries
========================= */
export interface StateFilters {
  keyword?: string;
  isActive?: boolean;
}
