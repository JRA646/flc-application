import { supabase } from "@/supabaseClient";
import type { Ministry, MinistryFilters } from "@/types/ministry";

const TABLE = "ministries" as const;
export async function fetchMinistries(
  filters: MinistryFilters = {}
): Promise<Ministry[]> {
  let query = supabase
    .from(TABLE)
    .select("id, name, code, description, is_active, created_at")
    .order("created_at", { ascending: false });

  if (filters.keyword?.trim()) {
    const keyword = filters.keyword.trim();
    query = query.or(
      `name.ilike.%${keyword}%,description.ilike.%${keyword}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("fetchMinistries error:", error);
    throw error;
  }

  return data ?? [];
}


export async function deleteMinistry(id: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) {
    console.error("deleteMinistry error:", error);
    throw error;
  }
}