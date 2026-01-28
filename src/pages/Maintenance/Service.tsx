import PageLayout from "@/components/PageLayout";
import { WorshipServiceIcon } from "@/config/icon";

export default function Service() {
  return (
    <PageLayout
      title="Service"
      subtitle="View and manage service records"
      icon={WorshipServiceIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Service table goes here
      </div>
    </PageLayout>
  );
}
