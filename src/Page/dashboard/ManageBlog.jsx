import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";

const ManageBlog = () => {
  const [article, setArticle] = useState([]); // State to hold articles
  const [loading, setLoading] = useState(true); // State to manage loading
  const { user, token } = useSelector((state) => state.auth); // Get user and token from Redux store
  const [users, setUsers] = useState([]); // State to hold users (if needed)

  // Redirect to login if user is not logged in
  if (!user) {
    window.location.href = "/login";
  }

  useEffect(() => {
    getAllArticles(); // Fetch all articles on component mount
  }, []);

  // Fetch all articles
  const getAllArticles = async () => {
    try {
      console.log("Token being used:", token);
      const cleanToken = token.replace(/^"|"$/g, ""); // Clean the token

      const response = await fetch(
        "https://abiodun.techtrovelab.com/api/articles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`, // Pass the cleaned token
          },
        }
      );

      const data = await response.json();
      console.log("Data fetched: articles", data);
      setArticle(data); // Set the fetched articles to state

      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/"; // Redirect to login if unauthorized
        return;
      }

      setUsers(data.data || []); // If needed, set users data
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false); // Set loading to false once the data is fetched
    }
  };

  // Delete article by id
  const handleDelete = async (id) => {
    const articleId = id.replace(/^"|"$/g, "");
    console.log(articleId, "delete");
    try {
      const cleanToken = token.replace(/^"|"$/g, ""); // Clean the token

      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/admin/articles/${articleId}`, // Dynamic URL with article id
        {
          method: "DELETE", // Use DELETE method for deletion
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`, // Pass the cleaned token
          },
        }
      );

      const data = await response.json();
      console.log("Data after deletion:", data);

      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        return;
      }

      if (response.status === 404) {
        alert("Article not found.");
        return;
      }

      if (response.status === 200) {
        alert("Article deleted successfully!");
        setArticle(article.filter((blog) => blog.id !== id)); // Remove the deleted article from the state
      }
    } catch (error) {
      console.error("Failed to delete article", error);
    }
  };

  return (
    <div className="w-full  ">
      <section className="py-1 bg-blueGray-50 w-full ">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col break-words w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Blogs
                  </h3>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              {/* Loading Indicator */}
              {loading ? (
                <div className="flex justify-center py-4">
                  <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-600"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <table className="items-center bg-transparent w-full border-collapse overflow-x-auto">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Blog Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Publishing Date
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Status
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Edit or Manage
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {article?.data?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-3">
                          No data available
                        </td>
                      </tr>
                    ) : (
                      article?.data?.map((blog, index) => (
                        <tr key={blog.id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {blog.title}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {new Date(blog.created_at).toLocaleString()}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                blog.status === "Published"
                                  ? "bg-green-500 text-white"
                                  : "bg-yellow-500 text-black"
                              }`}
                            >
                              {blog.status}
                            </span>
                          </td>
                          <td className="border-t-0 px-6 flex gap-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <Link to={`/dashboard/Update/${blog.uuid}`}>
                              <div className="flex gap-1">
                                <CiEdit className="size-4" />
                                <h6>Edit</h6>
                              </div>
                            </Link>
                          </td>
                          <td
                            onClick={() => handleDelete(blog.data.uuid)}
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                          >
                            <button className="bg-red-600 text-white px-2 py-1">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageBlog;
