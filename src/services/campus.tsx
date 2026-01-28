import { supabase } from "../supabaseClient";

const TABLE = "campuses" as const;

const CAMPUS_SELECT = `
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
`;

export const fetchCampuses = async (params?: {
  keyword?: string;
  isActive?: boolean;
  ids?: string[];
}) => {
  let query = supabase
    .from(TABLE)
    .select(CAMPUS_SELECT);

  if (params?.ids?.length) {
    query = query.in("id", params.ids);
  }

  if (params?.keyword?.trim()) {
    const keyword = params.keyword.trim();
    query = query.or(
      `name.ilike.%${keyword}%,address_line1.ilike.%${keyword}%,address_line2.ilike.%${keyword}%`
    );
  }

  if (typeof params?.isActive === "boolean") {
    query = query.eq("is_active", params.isActive);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase fetchCampuses error:", error);
    throw error;
  }

  return data ?? [];
};

export async function deleteCampus(campusId: string): Promise<void> {
  if (!campusId) {
    throw new Error("Campus ID is required");
  }

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", campusId);

  if (error) {
    console.error("deleteCampus error:", error);
    throw error;
  }
}

export function getCampusImageUrl(
  path?: string | null,
  fallback = "/images/campus-placeholder.png"
): string {
  if (!path) return fallback;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(path);

  return data?.publicUrl ?? fallback;
}