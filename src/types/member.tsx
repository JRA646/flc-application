import type { Campus } from "./campus";
/* =========================
   Base (shared fields)
========================= */
export interface MemberBase {
  user_id: string;
  first_name: string;
  last_name: string;
}


/* =========================
   Campus
========================= */
// export interface Campus {
//   id: string;
//   name: string;
//   code?: string;
//   is_active: boolean;
// }

/* =========================
   Member ↔ Campus pivot
========================= */
export interface MemberCampus {
  id: string;
  campus: Campus;
}

/* =========================
   Full DB row (with relations)
========================= */
export interface Member extends MemberBase {
  id: string;
  created_at: string;

  // 🔗 relations
  member_campuses?: MemberCampus[];
}

/* =========================
   Create / Store
========================= */
export type StoreMember = MemberBase;

/* =========================
   Update
========================= */
export type UpdateMember = Partial<MemberBase> & {
  id: string;
};

/* =========================
   Filters / Queries
========================= */
export interface MemberFilters {
  keyword?: string;
}
