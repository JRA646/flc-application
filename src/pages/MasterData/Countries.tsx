import PageLayout from "@/components/PageLayout";
import {
  CountryIcon,
  PlusIcon,
  SearchIcon,
  CheckCircleIcon,
  ArrowDownIcon,
  FilterIcon,
  CheckIcon
} from "@/config/icon";
import { useSupabaseRealtime } from "@/hooks/useSupabaseRealtime";
import { fetchCountries } from "@/services/country";
import { useCallback, useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import CountryCard from "@/components/MasteData/Countries/Card"
import { getIsActiveFilter,statuses } from "@/utils/filters";
import type{Status} from "@/utils/filters";

export default function Country() {
  const [countries, setCountries] = useState<any[]>([]);

  const [totalCountries, setTotalCountries] = useState<number>(0);
  const [totalActiveCountries, setTotalActiveCountries] = useState<number>(0);
  const [totalInActiveCountries, setTotalInActiveCountries] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selected, setSelected] = useState<Status>("All Status");

  const loadCountries = useCallback(async () => {
    setLoading(true);
    try {
      const isActive = getIsActiveFilter(selected);
      const data = await fetchCountries({ keyword: search, isActive : isActive });
      const activeResponse = await fetchCountries({});
      setTotalActiveCountries(activeResponse.filter(c => c.is_active).length)
      setTotalInActiveCountries(activeResponse.filter((c) => !c.is_active).length)
      setTotalCountries(activeResponse.length)
      setCountries(data);
    } finally {
      setLoading(false);
    }
  }, [search,selected]);

  useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  useSupabaseRealtime({
    table: "countries",
    events: "*",
    onChange: loadCountries,
  });

  return (
    <PageLayout
      title="Countries"
      subtitle="View and manage countries records"
      icon={CountryIcon}
      actions={
        <button className="inline-flex items-center cursor-pointer gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 shadow">
          <PlusIcon className="h-4 w-4" />
          Add Country
        </button>
      }
    >

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Total Countries"
          value={totalCountries}
          subtitle="All registered countries"
          icon={CountryIcon}
          gradient="from-indigo-500 to-indigo-600"
          glow="bg-indigo-200/40"
        />

        <StatCard
          title="Active Countries"
          value={totalActiveCountries}
          subtitle="Currently enabled"
          icon={CheckCircleIcon}
          gradient="from-emerald-500 to-emerald-600"
          glow="bg-emerald-200/40"
        />

        <StatCard
          title="Inactive Countries"
          value={totalInActiveCountries}
          subtitle="Disabled entries"
          icon={CountryIcon}
          gradient="from-gray-500 to-gray-600"
          glow="bg-gray-200/40"
        />
      </div>

      <div className="mb-4 flex items-center gap-3">
  {/* Search */}
  <div className="relative w-full max-w-sm">
    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search countries..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full rounded-md border border-gray-300 py-1.5 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none"
    />
  </div>

  {/* Filter */}
  <div className="relative">
    <button
      onClick={() => setFilterOpen(!filterOpen)}
      className="inline-flex cursor-pointer w-40 items-center justify-between rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
    >
      <span className="flex items-center gap-2 truncate">
        <FilterIcon className="h-4 w-4 text-gray-400" />
        {selected}
      </span>
      <ArrowDownIcon className="h-4 w-4 text-gray-400" />
    </button>

    {filterOpen && (
      <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow">
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


      <div className="overflow-hidden">
        {loading ? (
          <LoadingState label="Loading countries" />
        ) : countries.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={CountryIcon}
            title="No countries found"
            description="Get started by adding a country"
            actionLabel="Add Your First Country"
            onAction={() => console.log("Add country")}
          />

        )}
      </div>
    </PageLayout>
  );
}
