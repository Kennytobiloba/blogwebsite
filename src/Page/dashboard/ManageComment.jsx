import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";


const ManageBlog = () => {
  
  const [selectUser, setSelectUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [article, setArticle] = useState([]); // State to hold articles
  const [loading, setLoading] = useState(true); // State to manage loading
  const { user, token } = useSelector((state) => state.auth); // Get user and token from Redux store
  const [users, setUsers] = useState([]); // State to hold users (if needed)

  useEffect(() => {
    getAllArticles(); // Fetch all articles on component mount
  }, []);

  const getAllArticles = async () => {
    try {
      const cleanToken = token.replace(/^"|"$/g, ""); // Clean the token
      const response = await fetch(
        "https://abiodun.techtrovelab.com/api/comments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`, // Pass the cleaned token
          },
        }
      );

      const data = await response.json();
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

  const handleDelete = async (id) => {
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/comments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Comment deleted successfully");
        getAllArticles();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("An error occurred while deleting the article");
    }
  };

  const handleRoleUpdate = async (id, status) => {
    console.log(id, status, "comment")
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/comments/${id}?status=${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (response.ok) {
       
        getAllArticles();
        toast.success("Status updated successfully!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };


  const openModal = (article) => {
    setSelectUser(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectUser(null);
    setIsModalOpen(false);
  };

  

  return (
    <div className="w-full">
      <section className="py-1 bg-blueGray-50 w-full">
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
                <table className="table-auto w-full bg-white border-separate border-spacing-2 border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 bg-blueGray-50">
                        No.
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 bg-blueGray-50">
                        User
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 bg-blueGray-50">
                        Content
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 bg-blueGray-50">
                        Publishing Date
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 bg-blueGray-50">
                        Status
                      </th>
                     
                      <th className="px-6 py-3 text-xs font-semibold text-left text-gray-700 bg-blueGray-50">
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
                        <tr key={blog.id} className="border-b">
                          <th className="px-6 py-4 text-xs text-gray-700">
                            {index + 1}
                          </th>
                          <td className="px-6 py-4 text-xs text-gray-700">
                            {blog.name}
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-700">
                            {blog.content}
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-700">
                            {new Date(blog.created_at).toLocaleString()}
                          </td>
                         
                          <td className="px-6 py-4 text-xs text-gray-700">
                            <span
                              onClick={() => openModal(blog)}
                              className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                                blog.status === "Published"
                                  ? "bg-green-500 text-white"
                                  : "bg-yellow-500 text-black"
                              }`}
                            >
                              {blog.status}
                            </span>
                          </td>
                          
                          <td
                            onClick={() => handleDelete(blog.uuid)}
                            className="px-6 py-4 text-xs text-gray-700 cursor-pointer"
                          >
                            <button className="bg-red-600 text-white px-2 py-1 rounded">
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

        {isModalOpen && (
          <Modal
            title="Status"
            user={selectUser}
            onClose={closeModal}
            onRoleUpdate={handleRoleUpdate}
            valueone="approve"
            valuetwo="decline"
            valuethree="pending"
          />
        )}
        
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageBlog;
