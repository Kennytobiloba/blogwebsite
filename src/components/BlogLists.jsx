import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Filter from "../components/Filter";

const BlogLists = ({ article, loading, pagination , filters,  setFilters }) => {
  
  const articles =
    article?.data && Array.isArray(article.data) ? article.data : Array.isArray(article) ? article : [];
    
    const handlePageChange = (event, page) => {
      setFilters((prev) => ({ ...prev, page })); // Update filters with the new page
    }


  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        {/* Spinner while loading */}
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-10">
      <div className="w-full mx-auto">
        {/* <Filter filters={filters} setFilters={setFilters}/> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item, index) => {
            // Ensure the thumbnail is available and use the first item in the array
            const thumbnailUrl =
              item.thumbnail && item.thumbnail.length > 0
                ? `https://abiodun.techtrovelab.com/${item.thumbnail[0]}`
                : "https://via.placeholder.com/150"; // Fallback image URL

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link to={`/singlePage/${item.uuid}`}>
                  <div className="p-2">
                    <img
                      src={thumbnailUrl}
                      alt={item.title || "Thumbnail"}
                      className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 text-center">
                      {item.title}
                    </h2>

                    <div className="text-center">
                      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                        Read More
                      </button>
                    </div>
                  </div>
                  
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Stack spacing={2}>
          <Pagination
            count={pagination?.totalPages || 2}
            page={pagination?.currentPage || 1}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            style={{ marginTop: "20px" }}
            />
            
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default BlogLists;
