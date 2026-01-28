import PageLayout from "@/components/PageLayout";
import { ReportIcon } from "@/config/icon";

export default function Report() {
  return (
    <PageLayout
      title="Reports"
      subtitle="View and generate reports"
      icon={ReportIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Reports table goes here
      </div>
    </PageLayout>
  );
}
