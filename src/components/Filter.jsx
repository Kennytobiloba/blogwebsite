import React from "react";

const Filter = ({ filters, setFilters }) => {
  const { status, from, to, search, page, perPage, sort } = filters;
  // console.log(search, sort, perPage, status ,"findfliter")

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value, // Update the specific field dynamically
    });
  };

  return (
    <div className="flex gap-2 mb-4 flex-wrap lg:flex-nowrap px-2 mt-4">
      {/* Search Input */}
      <input
        type="text"
        name="search"
        placeholder="Search by title"
        className="border rounded p-2 w-full"
        value={search}
        onChange={handleChange}
      />
      
      {/* Sort Dropdown */}
      <select
        className="border rounded p-2"
        name="sort"
        value={sort}
        onChange={handleChange}
      >
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>

      {/* Per Page Dropdown */}
      <select
        className="border rounded p-2"
        name="perPage"
        value={perPage}
        onChange={handleChange}
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={20}>20 per page</option>
      </select>

      {/* Status Dropdown */}
     
    </div>
  );
};

export default Filter;
