import PageLayout from "@/components/PageLayout";
import { AttendanceIcon } from "@/config/icon";

export default function Attendance() {
  return (
    <PageLayout
      title="Attendance"
      subtitle="View and manage attendance records"
      icon={AttendanceIcon}
    >
      <div className="bg-white rounded-xl p-6 shadow">
        Attendance table goes here
      </div>
    </PageLayout>
  );
}
