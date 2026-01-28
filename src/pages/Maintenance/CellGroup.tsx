import PageLayout from "@/components/PageLayout";
import { CellGroupIcon } from "@/config/icon";

export default function CellGroup() {
  return (
    <PageLayout
      title="Cell Groups"
      subtitle="View and manage cell group records"
      icon={CellGroupIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Cell Group table goes here
      </div>
    </PageLayout>
  );
}
