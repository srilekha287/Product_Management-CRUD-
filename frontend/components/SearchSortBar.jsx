import React from "react";

export default function SearchSortBar({ q, setQ, sort, setSort, onRefresh }) {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
      <input
        className="border border-gray-300 rounded-lg px-3 py-2 w-60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name..."
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Newest</option>
        <option value="price_asc">Price: Min → Max</option>
        <option value="price_desc">Price: Max → Min</option>
      </select>

      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer"
        onClick={onRefresh}
      >
        Refresh
      </button>
    </div>
  );
}
