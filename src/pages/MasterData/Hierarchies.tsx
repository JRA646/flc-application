import PageLayout from "@/components/PageLayout";
import {
  PencilIcon,
  PlusIcon,
  SearchIcon,
  LevelsIcon
} from "@/config/icon";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { fetchMemberHierarchies } from "@/services/memberHierarchy";
import { useCallback, useEffect, useState } from "react";
import LoadingState from "@/components/LoadingState";
import Th from "@/components/Table/Th";
import Td from "@/components/Table/Td";
import StatusBadge from "@/components/StatusBadge";
import ActionButton from "@/components/Table/ActionButton";
import TableEmptyRow from "@/components/Table/TableEmptyRow";

export default function Hierarchies() {
  const [hierarchies, setHierarchies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadMemberHierarchies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchMemberHierarchies({ keyword: search });
      setHierarchies(data);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadMemberHierarchies();
  }, [loadMemberHierarchies]);

  useSupabaseRealtime({
    table: "member_hierarchies",
    events: "*",
    onChange: loadMemberHierarchies,
  });

  return (
    <PageLayout
      title="Hierarchies"
      subtitle="View and manage hierarchy records"
      icon={LevelsIcon}
      actions={
        <button className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 shadow">
          <PlusIcon className="h-4 w-4" />
          Add hierarchy
        </button>
      }
    >
      {/* Search */}
      <div className="relative max-w-sm mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search hierarchies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-1.5 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <Th>Name</Th>
              <Th>Code</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5}>
                  <LoadingState label="Loading Hierarchies…" />
                </td>
              </tr>
            ) : hierarchies.length > 0 ? (
              hierarchies.map((m) => (
                <tr key={m.id ?? m.code}
                  className="hover:bg-gray-100 cursor-pointer transition-colors">
                  <Td>{m.name}</Td>

                  <Td variant="mono">{m.code}</Td>

                  <Td variant="muted" className="max-w-md truncate">
                    {m.description}
                  </Td>

                  <Td>
                    <StatusBadge status={m.is_active} />
                  </Td>

                  <Td align="right">
                    <ActionButton
                      icon={<PencilIcon className="h-4 w-4" />}
                      onClick={() => console.log("Edit")}
                      title="Edit"
                    />
                  </Td>

                </tr>
              ))
            ) : (
              <TableEmptyRow
                colSpan={5}
                icon={LevelsIcon}
                title="No hierarchies found"
                description="Get started by adding a hierarchy"
                actionLabel="Add Your First Hierarchy"
                onAction={() => console.log("Add hierarchy")}
              />
            )}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
