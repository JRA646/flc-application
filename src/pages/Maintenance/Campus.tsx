import PageLayout from "@/components/PageLayout";
import {
  BuildingIcon,
  PlusIcon,
  LocationIcon,
  SearchIcon,
  FilterIcon,
  ArrowDownIcon,
  CheckIcon,
  MembersGroupIcon
} from "@/config/icon";
import StatCard from "@/components/StatCard";
import { useCallback, useEffect, useState } from "react";
import CampusCard from "@/components/Maintenance/Campus/CampusCard";
import { fetchCampuses } from "@/services/campus";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import EmptyState from "@/components/EmptyState";
import { useAuth } from "@/context/AuthContext";
import Modal from "@/components/Modal";
import LoadingState from "@/components/LoadingState";
import { getIsActiveFilter,statuses } from "@/utils/filters";
import type{Status} from "@/utils/filters";

export default function Campus() {
  const { campusIds } = useAuth();

  const [filterOpen, setFilterOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<Status>("All Status");
  const [campuses, setCampuses] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [campusCountTotal, setCampusCountTotal] = useState(0);
  const [campusActiveLocationTotal, setCampusActiveLocationTotal] = useState(0);
  const [campusActiveTotalCapacity, setCampusActiveTotalCapacity] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCampuses = useCallback(async () => {
    setLoading(true);

    try {
      if (!campusIds.length) {
        setCampuses([]);
        setCampusCountTotal(0);
        setCampusActiveLocationTotal(0);
        setCampusActiveTotalCapacity(0);
        return;
      }

      const isActive = getIsActiveFilter(selected);

      const data = await fetchCampuses({
        ids: campusIds,
        keyword: search,
        isActive,
      });
      setCampuses(data);

      const activeCampuses = await fetchCampuses({
        ids: campusIds,
        isActive: true,
      });

      setCampusCountTotal(activeCampuses.length);

      setCampusActiveTotalCapacity(
        activeCampuses.reduce(
          (sum, c) => sum + (c.capacity ?? 0),
          0
        )
      );

      setCampusActiveLocationTotal(
        new Set(
          activeCampuses
            .map((c: any) => c.city?.id)
            .filter(Boolean)
        ).size
      );
    } finally {
      setLoading(false);
    }
  }, [campusIds, search, selected]);


  useEffect(() => {
    loadCampuses();
  }, [loadCampuses]);

  useSupabaseRealtime({
    table: "campuses",
    events: "*",
    onChange: loadCampuses,
  });

  return (
    <PageLayout
      title="Campus Management"
      subtitle="Manage your church locations and facilities"
      icon={BuildingIcon}
      actions={
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 shadow"
        >
          <PlusIcon className="h-4 w-4" />
          Add Campus
        </button>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Campuses"
          value={campusCountTotal}
          icon={BuildingIcon}
          subtitle="All registered campuses"
          gradient="from-indigo-500 to-indigo-600"
          glow="bg-indigo-200/40"
        />

        <StatCard
          title="Active Locations"
          value={campusActiveLocationTotal}
          subtitle="Currently operational"
          icon={LocationIcon}
          gradient="from-emerald-500 to-emerald-600"
          glow="bg-emerald-200/40"
        />

        <StatCard
          title="Total Capacity"
          value={campusActiveTotalCapacity}
          subtitle="Capacity of active campuses"
          icon={MembersGroupIcon}
          gradient="from-blue-500 to-blue-600"
          glow="bg-blue-200/40"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mb-6">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campuses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="inline-flex sm:w-40 items-center justify-between rounded-lg border border-gray-200 cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <span className="flex items-center gap-2 truncate">
              <FilterIcon className="h-4 w-4 text-gray-400" />
              {selected}
            </span>
            <ArrowDownIcon className="h-4 w-4 text-gray-400" />
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow z-50">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelected(status);
                    setFilterOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                  {status}
                  {selected === status && (
                    <CheckIcon className="h-4 w-4 text-indigo-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <LoadingState label="Loading campuses…" />
      ) : campuses.length === 0 ? (
        <EmptyState
          icon={BuildingIcon}
          title="No campuses found"
          description={
            selected === "All Status"
              ? "Get started by adding your first campus"
              : "Try adjusting your search or filters"
          }
          actionLabel="Add Campus"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((campus) => (
            <CampusCard
              key={campus.id}
              name={campus.name}
              address={`${campus.address_line1} ${campus.address_line2 ?? ""}, ${campus.city?.name} ${campus.city?.state?.name}, ${campus.city?.state?.country?.name}`}
              capacity={campus.capacity}
              imageUrl={campus.image_path}
              status={campus.is_active ? "Active" : "Inactive"}
              onEdit={() => console.log("Edit campus")}
            />
          ))}
        </div>
      )}


      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Campus"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border rounded border-gray-200 cursor-pointer"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
              Save
            </button>
          </div>
        }
      />
    </PageLayout>
  );
}
