import type { State } from "./state";

/* =========================
   Base (shared fields)
========================= */
export interface CityBase {
  name: string;
  postal_code: string;
  state: State;
}

/* =========================
   Full DB row
========================= */
export interface City extends CityBase {
  id: string;
  created_at: string;
}

/* =========================
   Create / Store
========================= */
export type StoreCity = CityBase;

/* =========================
   Update
========================= */
export type UpdateCity = Partial<CityBase> & {
  id: string;
};

/* =========================
   Filters / Queries
========================= */
export interface CityFilters {
  keyword?: string;
  isActive?: boolean;
}
