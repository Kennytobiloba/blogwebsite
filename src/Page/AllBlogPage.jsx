import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import FilterForm from "../components/Filter";
import BlogLists from "../components/BlogLists";
import Footer from "../components/Footer";


const AllBlogPage = () => {
  const [articles, setArticle] = useState([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    search:"",
    page: 1,
    perPage: 10,
    sort: "asc",
  });

  // Fetch articles with filters applied
  const fetchArticles = async () => {
    setLoading(true); // Corrected loading state update
  
    try {
      const { from, to, search, page, perPage, sort, status } = filters;
      let url = `https://abiodun.techtrovelab.com/api/articles?page=${page}&perPage=${perPage}`;
      
      // Log the URL for debugging
      console.log("Fetching data from URL:", url);
      
      if (status) url += `&status=${status}`;
      if (from) url += `&from=${from}`;
      if (to) url += `&to=${to}`;
      if (sort) url += `&sort=${sort}`;
      
      const response = await fetch(url, { method: "GET" });
      
      // Check for response status
      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/"; // Redirect to login if unauthorized
        return;
      }
  
      const data = await response.json();
      console.log("API Response:", data); // Log the data for debugging
      
      if (data && Array.isArray(data.data)) {
        setArticle(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading is set to false after request
    }
  };
  

  // Trigger fetchArticles when filters change or on initial load
  useEffect(() => {
    fetchArticles();
  }, [filters]);

  // Function to handle filter changes
  

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="w-full grid  mt-8  gap-6 max-w-7xl mx-auto py-0">
        <h1 className="text-center lg:text-3xl text-2xl font-bold font-poppins">All Articles</h1>
        <div className="w-full">
        <BlogLists
         article={articles}
         pagination={pagination}
         filters={filters}
         setFilters={setFilters}
          loading={loading} />
        </div>

    
         
      
      </div>
      <Footer/>
    </div>
  );
};

export default AllBlogPage;
