import { supabase } from "@/supabaseClient";
import type { MemberCampus } from "@/types/memberCampus";

const TABLE = "member_campuses";

/* =========================
   Get campuses by ONE member
========================= */
export async function getMemberCampusesByMemberId(
  memberId: string
): Promise<MemberCampus[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("member_id", memberId);

  if (error) {
    console.error("getMemberCampusesByMemberId error:", error);
    throw error;
  }

  return data ?? [];
}
