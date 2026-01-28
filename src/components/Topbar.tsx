export default function Topbar() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <p className="text-gray-500">
          Monitor attendance across all campuses
        </p>
      </div>

      <div className="flex items-center gap-3">
        <select className="border rounded-md px-3 py-2">
          <option>All Campuses</option>
        </select>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md">
          + Record
        </button>
      </div>
    </header>
  );
}
