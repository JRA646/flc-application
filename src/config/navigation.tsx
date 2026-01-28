import type { ComponentType, SVGProps } from "react";
import {
  DashboardIcon,
  MaintenanceIcon,
  ReportIcon,
  CityIcon,
  CountryIcon,
  StateIcon,
  MasterDataIcon,
  MinistryTeamIcon,
  WorshipServiceIcon,
  AttendanceIcon,
  MembersGroupIcon,
  LevelsIcon,
  CellGroupIcon,
  ProfileIcon,
  BuildingIcon,
  NeighborhoodIcon2,
  ServiceTypeIcon
} from "./icon";
export type MenuItem = {
  label: string;
  path?: string;
  protected?: boolean;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  children?: MenuItem[];
};

export const menuItems: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    protected: true,
    icon: DashboardIcon,
  },
  {
    label: "Attendance",
    path: "/attendance",
    protected: true,
    icon: AttendanceIcon,
  },
  {
    label: "Member",
    path: "/member",
    protected: true,
    icon: MembersGroupIcon,
  },
  {
    label: "Maintenance",
    protected: true,
    icon: MaintenanceIcon,
    children: [
      { label: "Campus", path: "/maintenance/campus", icon: BuildingIcon },
      { label: "Service", path: "/maintenance/service", icon: WorshipServiceIcon },
      { label: "Cell Group", path: "/maintenance/cellgroup", icon: CellGroupIcon },
    ],
  },
  {
    label: "Master Data",
    protected: true,
    icon: MasterDataIcon,
    children: [
      { label: "Cities", path: "/masterdata/cities", icon: CityIcon },
      { label: "Countries", path: "/masterdata/countries", icon: CountryIcon },
      { label: "States", path: "/masterdata/states", icon: StateIcon },
      { label: "Neighborhood", path: "/masterdata/neighborhood", icon: NeighborhoodIcon2 },
      { label: "Hierarchies", path: "/masterdata/hierarchies", icon: LevelsIcon },
      { label: "Ministries", path: "/masterdata/ministries", icon: MinistryTeamIcon },
      { label: "Service Types", path: "/masterdata/servicetypes", icon: ServiceTypeIcon },
    ],
  },
  {
    label: "Reports",
    path: "/report",
    protected: true,
    icon: ReportIcon,
  },
  {
    label: "Profile",
    path: "/profile",
    protected: true,
    icon: ProfileIcon,
  },
];
