import PageLayout from "@/components/PageLayout";
import { MembersGroupIcon } from "@/config/icon";

export default function Members() {
  return (
    <PageLayout
      title="Members"
      subtitle="Manage church members and profiles"
      icon={MembersGroupIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Members table goes here
      </div>
    </PageLayout>
  );
}
