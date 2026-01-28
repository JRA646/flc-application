import { supabase } from "../supabaseClient";
import type { Member } from "@/types/member";

const TABLE = "members" as const;
export const getMemberByUserId = async (
  userId: string
): Promise<Member | null> => {

   const { data, error } = await supabase
  .from(TABLE)
  .select(`
    *,
    member_campuses (
      member_id,
      campus_id,
      campus:campuses!inner (
        id,
        name,
        is_active,
        capacity,
        image_path,
        address_line1,
        address_line2,
        city:cities (
          id,
          name,

          state:states (
            id,
            name,
            country:countries (
              id,
              name
            )
          )
        )
      )
    )
  `)
  .eq("user_id", userId)
  .eq("member_campuses.campus.is_active", true)
  .maybeSingle();

  if (error) throw error;
  return data;
};


