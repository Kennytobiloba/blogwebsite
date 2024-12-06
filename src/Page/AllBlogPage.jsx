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
    search:"",
    page: 1,
    perPage: 10,
    sort: "asc",
  });

  // Fetch articles with filters applied
  const fetchArticles = async () => {
    setLoading(true); 
    try {
      const { status, from, to, search, page, perPage, sort } = filters;
      // const cleanToken = token.replace(/^"|"$/g, "");
      let url = `https://abiodun.techtrovelab.com/api/articles?page=${page}&perPage=${perPage}`;
  
      if (status) url += `&status=${status}`;
      if (search) url += `&search=${search}`;
      if (sort) url += `&sort=${sort}`;
      if (status) url += `&status=${status}`;
    
      const response = await fetch(url, {
        method: "GET",
      });
  
      const data = await response.json();
      console.log("data", data )
  
      if (response.ok) {
        setArticle(data);
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

  // Function to handle filter changes
  

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="w-full grid  mt-8  gap-6 max-w-7xl mx-auto py-0">
        <h1 className="text-center lg:text-3xl text-2xl font-bold font-poppins">All Articles</h1>
        <div className="w-full">
          <Filter filters={filters} setFilters={setFilters}/>
          
        <BlogLists
         article={articles}
         pagination={pagination}
         filters={filters}
         setFilters={setFilters}
          loading={loading} />
        </div>

    
         
      
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer/>
    </div>
  );
};

export default AllBlogPage;
