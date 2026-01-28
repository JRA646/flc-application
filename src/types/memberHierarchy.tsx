export type MemberHierarchy = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  hierarchy_rank: number;
  is_active: boolean;
  created_at: string;
};

export type MemberHierarchyInput = {
  code: string;
  name: string;
  description?: string | null;
  hierarchy_rank: number;
  is_active?: boolean;
};

export type MemberHierarchyFilters = {
  keyword?: string;
  is_active?: boolean;
};
