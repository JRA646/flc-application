import PageLayout from "@/components/PageLayout";
import { CityIcon } from "@/config/icon";

export default function Cities() {
  return (
    <PageLayout
      title="City"
      subtitle="View and manage city records"
      icon={CityIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        City table goes here
      </div>
    </PageLayout>
  );
}
