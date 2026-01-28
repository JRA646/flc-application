import type { MemberBase } from "@/types/member";

export const getMemberInitials = (member: MemberBase): string => {
  const first = member.first_name?.trim()?.[0] ?? "";
  const last = member.last_name?.trim()?.[0] ?? "";
  return `${first}${last}`.toUpperCase();
};

export const getMemberFullName = (member: MemberBase): string => {
  return `${member.first_name} ${member.last_name}`.trim();
};