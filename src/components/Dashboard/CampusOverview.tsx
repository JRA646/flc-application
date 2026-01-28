import CampusCard from "./CampusCard";
import { Link } from "react-router-dom";
import { fetchCampuses } from "@/services/campus";
import { useCallback, useEffect, useState } from "react";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { useAuth } from "@/context/AuthContext";
import LoadingState from "@/components/LoadingState";

export default function CampusOverview() {
  const { campusIds } = useAuth();
  const [campuses, setCampuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCampuses = useCallback(async () => {
    setLoading(true);
    try {
      if (!campusIds.length) {
        setCampuses([]);
        return;
      }

      const data = await fetchCampuses({
        ids: campusIds,
        isActive: true,
      });
      setCampuses(data);
    } finally {
      setLoading(false);
    }
  }, [campusIds]);

  useEffect(() => {
    loadCampuses();
  }, [loadCampuses]);

  useSupabaseRealtime({
    table: "campuses",
    events: "*",
    onChange: loadCampuses,
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Campus Overview
        </h2>

        <Link
          to="/maintenance/campus"
          className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1"
        >
          View all →
        </Link>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="rounded-2xl bg-white">
          <LoadingState label="Loading campus overview…" />
        </div>
      ) : campuses.length === 0 ? (
        <div className="rounded-2xl bg-white">
          <LoadingState
            label="No active campuses found"
            size="sm"
            className="py-10"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {campuses.map((campus) => (
            <CampusCard campus={campus} key={campus.id} />
          ))}
        </div>
      )}
    </section>
  );
}
