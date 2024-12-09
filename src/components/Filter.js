import React from "react";

const Filter = ({ filters, setFilters }) => {
  const { status, from, to, search, page, perPage, sort } = filters;

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
      {/* Search Input with Icon */}
      <div className="relative w-full lg:w-3/4 "> {/* Adjust width for responsiveness */}
        <input
          type="text"
          name="search"
          placeholder="Search by title"
          className="border rounded-l p-2 w-full pr-10" // Reduced padding and added space for icon
          value={search}
          onChange={handleChange}
        />
       
      </div>

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
    </div>
  );
};

export default Filter;
