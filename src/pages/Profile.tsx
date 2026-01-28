import PageLayout from "@/components/PageLayout";
import { ProfileIcon } from "@/config/icon";

export default function Profile() {
  return (
    <PageLayout
      title="Profile"
      subtitle="View and manage your profile"
      icon={ProfileIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Profile table goes here
      </div>
    </PageLayout>
  );
}
