import type { Country } from "./country";
import type { State } from "./state";
import type { City } from "./city";
/* =========================
   Base (shared fields)
========================= */
export interface CampusBase {
  name: string;
  code?: string | null;
  is_active: boolean;
  country: Country;
  city?: City | null;
  state: State;
  capacity: number | 0;
  image_path : string;
  address_line1: string;
  address_line2?: string | ""
}

/* =========================
   Full DB row
========================= */
export interface Campus extends CampusBase {
  id: string;
  created_at: string;
}

/* =========================
   Create / Store
========================= */
export type StoreCampus = Omit<CampusBase, "is_active"> & {
  is_active?: boolean;
};

/* =========================
   Update
========================= */
export type UpdateCampus = Partial<CampusBase> & {
  id: string;
};

/* =========================
   Filters / Queries
========================= */
export interface CampusFilters {
  keyword?: string;
  isActive?: boolean;
}

export interface CampusListItem {
  id: string;
  name: string;
  is_active: boolean;
  capacity: number;
  image_path?: string;
  address_line1?: string;
  address_line2?: string;

  city: {
    id: string;
    name: string;
    state: {
      id: string;
      name: string;
      country?: {
        id: string;
        name: string;
      };
    }[];
  }[];
}
