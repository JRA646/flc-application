import EmptyState from "@/components/EmptyState";
import PageLayout from "@/components/PageLayout";
import {
  StateIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
} from "@/config/icon";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import LoadingState from "@/components/LoadingState";
import { fetchStates } from "@/services/state";
import { useCallback, useEffect, useState } from "react";
import Th from "@/components/Table/Th";
import Td from "@/components/Table/Td";
import StatusBadge from "@/components/StatusBadge";
import ActionButton from "@/components/Table/ActionButton";
import TableEmptyRow from "@/components/Table/TableEmptyRow";

export default function State() {
  const [states, setStates] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadStates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchStates({ keyword: search });
      setStates(data);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadStates();
  }, [loadStates]);

  useSupabaseRealtime({
    table: "state",
    events: "*",
    onChange: loadStates,
  });

  return (
    <PageLayout
      title="State"
      subtitle="View and manage state records"
      icon={StateIcon}
      actions={
        <button className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 shadow">
          <PlusIcon className="h-4 w-4" />
          Add state
        </button>
      }
    >
      <div className="relative max-w-sm mb-4">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search states..."
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
              <Th>Status</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={4}>
                  <LoadingState label="Loading states…" />
                </td>
              </tr>
            ) : states.length > 0 ? (
              states.map((m) => (
                <tr key={m.id ?? m.code}
                  className="hover:bg-gray-100 cursor-pointer transition-colors">
                  <Td>{m.name}</Td>
                  <Td variant="mono">{m.code}</Td>

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
                colSpan={4}
                icon={StateIcon}
                title="No state found"
                description="Get started by adding a state"
                actionLabel="Add Your First State"
                onAction={() => console.log("Add state")}
              />
            )}
          </tbody>


        </table>
      </div>
    </PageLayout>
  );
}
