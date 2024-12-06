import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterForm from "../components/Filter";
import BlogLists from "../components/BlogLists";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogFilter from "./dashboard/BlogFliter";
import Filter from "../components/Filter";

const AllBlogPage = () => {
  const [articles, setArticle] = useState([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    search: "",
    page: 1,
    perPage: 10,
    sort: "asc",
  });

  // Fetch articles with filters applied
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { status, from, to, search, page, perPage, sort } = filters;
      let url = `https://abiodun.techtrovelab.com/api/articles?page=${page}&perPage=${perPage}`;

      if (status) url += `&status=${status}`;
      if (search) url += `&search=${search}`;
      if (sort) url += `&sort=${sort}`;
      if (status) url += `&status=${status}`;

      const response = await fetch(url, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        const sortedArticles = data.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setArticle(sortedArticles);
        setPagination(data.pagination);
      } else {
        toast.error(data.message || "Failed to fetch articles.");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast.error("An error occurred while fetching articles.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Trigger fetchArticles when filters change or on initial load
  useEffect(() => {
    fetchArticles();
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="w-full grid mt-8 gap-6 max-w-7xl mx-auto py-6 px-4">
        {/* Page Title */}
        <h1 className="text-center lg:text-4xl text-3xl font-bold font-poppins text-gray-800 mb-6">
          All Articles
        </h1>

        {/* Filter Section */}
        <div className="flex justify-start lg:justify-end w-full mb-4">
          <Filter filters={filters} setFilters={setFilters} />
        </div>

        {/* Article List */}
        <BlogLists
          article={articles}
          pagination={pagination}
          filters={filters}
          setFilters={setFilters}
          loading={loading}
        />

        {/* Pagination */}
        {pagination && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
              onClick={() => setFilters({ ...filters, page: pagination.page + 1 })}
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default AllBlogPage;
