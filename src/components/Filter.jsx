import React from "react";

const Filter = ({ filters, handleFilterChange }) => {
  return (
    <div className="bg-gradient-to-r bg-gray-900 shadow-lg rounded- p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      <div className="grid grid-cols-1 gap-4">
        <input
          type="number"
          name="from"
          value={filters.from}
          onChange={handleFilterChange}
          placeholder="Range From"
          className="border border-gray-300 rounded-lg p-2 text-black"
        />
        <input
          type="number"
          name="to"
          value={filters.to}
          onChange={handleFilterChange}
          placeholder="Range To"
          className="border border-gray-300 rounded-lg p-2 text-black"
        />
        <div>
          <p className="font-medium mb-2">Status:</p>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="status"
              value=""
              checked={filters.status === ""}
              onChange={handleFilterChange}
              className="accent-green-500"
            />
            <span>All Status</span>
          </label>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="status"
              value="published"
              checked={filters.status === "published"}
              onChange={handleFilterChange}
              className="accent-blue-500"
            />
            <span>Published</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={filters.status === "draft"}
              onChange={handleFilterChange}
              className="accent-red-500"
            />
            <span>Draft</span>
          </label>
        </div>
        <input
          type="number"
          name="page"
          value={filters.page}
          onChange={handleFilterChange}
          placeholder="Page"
          className="border border-gray-300 rounded-lg p-2 text-black"
        />
        <input
          type="number"
          name="perPage"
          value={filters.perPage}
          onChange={handleFilterChange}
          placeholder="Items Per Page"
          className="border border-gray-300 rounded-lg p-2 text-black"
        />
        {/* <div>
          <p className="font-medium mb-2">Sort:</p>
          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={filters.sort === "asc"}
              onChange={handleFilterChange}
              className="accent-purple-500"
            />
            <span>Ascending</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={filters.sort === "desc"}
              onChange={handleFilterChange}
              className="accent-orange-500"
            />
            <span>Descending</span>
          </label>
        </div> */}
      </div>
    </div>
  );
};

export default Filter;
