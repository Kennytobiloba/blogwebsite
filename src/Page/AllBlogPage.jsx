import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterForm from "../components/Filter";
import BlogLists from "../components/BlogLists";

const AllBlogPage = () => {
  const [articles, setArticle] = useState([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    page: 1,
    perPage: 10,
    sort: "asc",
  });

  // Fetch articles with filters applied
  const fetchArticles = async () => {
    const { from, to, status, page, perPage, sort } = filters;
    let url = `https://abiodun.techtrovelab.com/api/articles?page=${page}&perPage=${perPage}`;

    // Add filters to URL if they exist
    if (status) url += `&status=${status}`;
    if (from) url += `&from=${from}`;
    if (to) url += `&to=${to}`;
    if (sort) url += `&sort=${sort}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setArticle(data.data);
        setPagination(data.pagination);
      }
      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/"; // Redirect to login if unauthorized
        return;
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetchArticles when filters change or on initial load
  useEffect(() => {
    fetchArticles();
  }, [filters]);

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to page 1 on filter change
    }));
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto py-0">
        {/* Filter Section */}
        <FilterForm filters={filters} handleFilterChange={handleFilterChange} />

        {/* Blog Content Section */}
        <div className="w-full lg:col-span-2">
          <BlogLists article={articles} pagination={pagination} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AllBlogPage;
