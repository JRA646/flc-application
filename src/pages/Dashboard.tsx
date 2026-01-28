import PageLayout from "@/components/PageLayout";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import CampusOverview from "@/components/Dashboard/CampusOverview";
import { DashboardIcon } from "@/config/icon";

export default function Dashboard() {
  return (
    <PageLayout
      title="Dashboard"
      subtitle="Monitor attendance across all campuses"
      icon={DashboardIcon}
    >
      <DashboardStats />

      <div className="bg-white rounded-2xl p-6 
      shadow-lg shadow-gray-200/60">
        <h2 className="font-semibold mb-4">
          Attendance Trends (Last 30 Days)
        </h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          📈 Chart goes here
        </div>
      </div>

      <CampusOverview />
    </PageLayout>
  );
}
