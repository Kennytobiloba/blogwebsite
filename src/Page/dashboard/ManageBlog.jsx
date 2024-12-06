import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import CommentModal from "./CommentModal";
import { Pagination } from "@mui/material";
import BlogFliter from "./BlogFliter";

const ManageBlog = () => {

 
  const [commentModal, setCommentModal] = useState(null)
  const [iscommentOpen, setCommentOpen] = useState(false)
  const [selectUser, setSelectUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [article, setArticle] = useState([]); // State to hold articles
  const [loading, setLoading] = useState(true); // State to manage loading

  const [users, setUsers] = useState([]); // State to hold users (if needed)
  const [pagination, setPagination] = useState();
  // console.log(pagination, "pppp")
  const { user, token } = useSelector((state) => state.auth); 
  // console.log(user , "userss")
  if (!user) {
    window.location.href = "/login";
  }

  const [filters, setFilters] = useState({
    from: "",
    to: "",
    status: "",
    search:"",
    page: 1,
    perPage: 10,
    sort: "asc",
  });
  // const { from, to, status, search, page, perPage, sort} = filters
  // console.log("datform", status, page)

 


  // Fetch all articles
  const getAllArticles = async () => {
    setLoading(true); 
    try {
      const { status, from, to, search, page, perPage, sort } = filters;
      const cleanToken = token.replace(/^"|"$/g, "");
      let url = `https://abiodun.techtrovelab.com/api/articles?page=${page}&perPage=${perPage}`;
  
      if (status) url += `&status=${status}`;
      if (search) url += `&search=${search}`;
      if (sort) url += `&sort=${sort}`;
      if (status) url += `&status=${status}`;
    
      const response = await fetch(url, {
        method: "GET",
      });
  
      const data = await response.json();
      console.log("data", )
  
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

  useEffect(() => {
    getAllArticles(); // Fetch all articles on component mount
  }, [filters]);

 
  
// handle delect
  const handleDelete = async (id) => {
    console.log("Article ID to delete:", id); // Debugging to ensure it's the correct value

    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/admin/articles/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );

      const data = await response.json();
      // console.log("Delete response", data);

      if (response.ok) {
        toast.success("Article deleted successfully");
        getAllArticles();
       
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("An error occurred while deleting the article");
    }
  };
//  handle roleupdate
  const handleRoleUpdate = async (id, status) => {
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/admin/articles/${id}/status?status=/${status}`,
        {
          method: "PATCH",
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

// handle commentUpdate
  const handleCommenntUupdate = async (id, status) => {
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/admin/articles/${id}/toggle-comment`,
        {
          method: "PATCH",
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

  const OpenCommentModal = (userinfo) => {
    setCommentModal(userinfo);
    setCommentOpen(true)
  
   }
   const closeComment = () => {
    setCommentModal(null)
    setCommentOpen(false)

   }

  const openModal = (article) => {
    setSelectUser(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCommentModal(null);
    setIsModalOpen(false);
    
  };
  const handlePageChange = (event, page) => {
  setFilters((prev) => ({ ...prev, page })); // Update filters with the new page
}
  

  return (
    <div className=" ">
      <section className="py-1 bg-blueGray-50 w-full">
        <div className="w-full mb-12 xl:mb-0  mx-auto mt-20 py-10 px-2 ">
          <div className="relative  flex flex-col break-words w-full mb-6 shadow-lg rounded  overflow-x-auto">
            <div className="flex justify-end pl-2 mb-2">
            <Link to="/dashboard/createpost" className='px-4 bg-blue-600 py-2 text-white border rounded-md'>Create Article</Link>
            </div>
          <BlogFliter
             filters={filters}
             setFilters={setFilters}
            />
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
               
                <div className="block w-full overflow-x-auto">
                   <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                       Title
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Publishing Date
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Comment 
                      </th>

                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Status
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Edit 
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
                          {blog.title.length > 30 ? `${blog.title.substring(0, 30)}...` : blog.title}
                        </td>


                          
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {new Date(blog.created_at).toLocaleString()}
                          </td>
                          
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <span
                             onClick={() =>OpenCommentModal(blog)}
                              className={`px-2 py-1 rounded-full text-xs cursor-pointer ${
                                blog.commentable === true
                                  ? "bg-green-500 text-white"
                                  : "bg-yellow-500 text-black"
                              }`}
                            >
                              {blog.commentable ? "true" :"false"}
                            </span>
                          </td>

                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
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
                          <td className="border-t-0 px-6 flex gap-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <Link to={`/dashboard/Update/${blog.uuid}`}>
                              <div className="flex gap-1">
                                <CiEdit className="size-4" />
                                <h6>Edit</h6>
                              </div>
                            </Link>
                          </td>
                          <td
                            onClick={() => handleDelete(blog.uuid)}
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
                </div>
              )}
            </div>
             <Pagination
            count={pagination?.totalPages || 2}
            page={pagination?.currentPage || 1}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            style={{ marginTop: "20px" }}
      />
          </div>
        </div>
        {isModalOpen && (
          <Modal
           title={"Status"}
            user={selectUser}
            onClose={closeModal}
            onRoleUpdate={handleRoleUpdate}
            valueone={"draft"}
            valuetwo={"publish"}
            
          />
        )}
        {
           iscommentOpen && (
            <CommentModal 
            user={commentModal}
             title={"Comment"} 
             valueone={"false"} 
             valuetwo={'true'}
            onClose={closeComment} onRoleUpdate={handleCommenntUupdate} />
          )
        }
      </section>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageBlog;
