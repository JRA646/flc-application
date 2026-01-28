import PageLayout from "@/components/PageLayout";
import { NeighborhoodIcon2 } from "@/config/icon";

export default function Neighborhood() {
  return (
    <PageLayout
      title="Neighborhood"
      subtitle="View and manage neighborhood records"
      icon={NeighborhoodIcon2}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Neighborhood table goes here
      </div>
    </PageLayout>
  );
}
