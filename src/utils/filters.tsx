export const statuses = ["All Status", "Active", "Inactive"] as const;
export type Status = (typeof statuses)[number];

export const getIsActiveFilter = (
  status?: Status
): boolean | undefined => {
  if (!status || status === "All Status") return undefined;
  return status === "Active";
};