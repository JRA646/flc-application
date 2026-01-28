import { useAuth } from "@/context/AuthContext";
import StatCard from "./StatCard";
import {
  MembersGroupIcon,
  TrendingUpIcon,
  ChurchCampusIcon,
} from "@/config/icon";

export default function DashboardStats() {
  const { campuses } = useAuth();
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* THIS WEEK */}
      <StatCard
        title="This Week"
        value={0}
        subtitle="Total attendance"
        footerText="↓ 100% from last week"
        footerColor="red"
        icon={MembersGroupIcon}
        gradient="from-indigo-500 to-indigo-600"
        glow="bg-indigo-500/10"
      />

      {/* FIRST-TIME VISITORS */}
      <StatCard
        title="First-Time Visitors"
        value={0}
        subtitle="This week"
        icon={TrendingUpIcon}
        gradient="from-emerald-500 to-emerald-600"
        glow="bg-emerald-500/10"
      />

      {/* ACTIVE CAMPUSES */}
      <StatCard
        title="Active Campuses"
        value={campuses.length.toString()}
        subtitle="10 services"
        icon={ChurchCampusIcon}
        gradient="from-violet-500 to-violet-600"
        glow="bg-violet-500/10"
      />
    </section>
  );
}
