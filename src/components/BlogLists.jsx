import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const BlogLists = ({ article, loading, pagination }) => {
  // console.log("Received articles p:", pagination);

  // Check if 'article' exists and extract array if nested
  const articles =
    article?.data && Array.isArray(article.data) ? article.data : Array.isArray(article) ? article : [];

  // Pagination state
  const [page, setPage] = useState(pagination?.currentPage || 1);

  // Use pagination.perPage for dynamic number of articles per page
  const articlesPerPage = pagination?.perPage || 6; // Default to 6 if not provided

  // Calculate the current articles to display based on the page
  const indexOfLastArticle = page * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArticles.map((item, index) => {
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
              count={pagination?.totalPages || 1} // Total pages from pagination prop
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default BlogLists;
