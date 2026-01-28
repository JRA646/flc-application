import { supabase } from "@/supabaseClient";
import type {
  MemberHierarchy,
  MemberHierarchyInput,
  MemberHierarchyFilters,
} from "@/types/memberHierarchy";

const TABLE = "member_hierarchies";

/* =========================
   Get all hierarchies
========================= */
export async function fetchMemberHierarchies(
  filters: MemberHierarchyFilters = {}
): Promise<MemberHierarchy[]> {
  let query = supabase
    .from(TABLE)
    .select(`
      id,
      code,
      name,
      description,
      hierarchy_rank,
      is_active,
      created_at
    `)
    .order("hierarchy_rank", { ascending: true });

  if (filters.keyword?.trim()) {
    const keyword = filters.keyword.trim();
    query = query.or(
      `name.ilike.%${keyword}%,code.ilike.%${keyword}%,description.ilike.%${keyword}%`
    );
  }

  if (filters.is_active !== undefined) {
    query = query.eq("is_active", filters.is_active);
  }

  const { data, error } = await query;

  if (error) {
    console.error("fetchMemberHierarchies error:", error);
    throw error;
  }
  return data ?? [];
}

/* =========================
   Get by ID
========================= */
export async function getMemberHierarchyById(
  id: string
): Promise<MemberHierarchy | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getMemberHierarchyById error:", error);
    throw error;
  }

  return data;
}

/* =========================
   Create
========================= */
export async function createMemberHierarchy(
  payload: MemberHierarchyInput
): Promise<MemberHierarchy> {
  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      ...payload,
      is_active: payload.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error("createMemberHierarchy error:", error);
    throw error;
  }

  return data;
}

/* =========================
   Update
========================= */
export async function updateMemberHierarchy(
  id: string,
  payload: Partial<MemberHierarchyInput>
): Promise<MemberHierarchy> {
  const { data, error } = await supabase
    .from(TABLE)
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("updateMemberHierarchy error:", error);
    throw error;
  }

  return data;
}

/* =========================
   Delete
========================= */
export async function deleteMemberHierarchy(
  id: string
): Promise<boolean> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteMemberHierarchy error:", error);
    throw error;
  }

  return true;
}
