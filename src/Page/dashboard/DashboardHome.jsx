import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]); // Separate state for admin users
  const [article, setArticle] = useState();
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(true);
  const [articlePublish, setArticlePublished] = useState([])
  const [draftArticle, setdraftArticle] = useState([])
  const [approved , SetApproved] = useState([])
  const [decline, setDecline] = useState([])
  const [pending, setPending] = useState([])

  if (!user) {
    window.location.href = "/login";
  }

  useEffect(() => {
    getUser();
    getAllarticle();
    getUserComment();
  }, []);

  // Get all users function
  const getUser = async () => {
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch("https://abiodun.techtrovelab.com/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });

      const data = await response.json();
      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        return;
      }

      setUsers(data.data || []);
      const admins = data.data?.filter((user) => user.is_admin === true); // Filter admin users
      // console.log("user", admins)
      setAdminUsers(admins || []); // Update state with filtered admin users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Get all articles function
  const getAllarticle = async () => {
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch("https://abiodun.techtrovelab.com/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });

      const data = await response.json();
      const published = data.data?.filter((article) => article.status === "published"); 
      setArticlePublished(published)
      const draft = data.data?.filter((article) => article.status === "draft"); 
      // console.log("article", draft)
      setdraftArticle(draft);

      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/";
        return;
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // Get all comments function
  const getUserComment = async () => {
    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch("https://abiodun.techtrovelab.com/api/comments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });

      const data = await response.json();
      console.log("data", data)
      setComment(data);
      const approved = data.data?.filter((article) => article.status === "approved"); 
      SetApproved(approved)
      const delined = data.data?.filter((article) => article.status === "declined");
      setDecline(delined) 
      const pending = data.data?.filter((article) => article.status === "pending");
      setPending(pending)
      // console.log("article", draft)
      // setdraftArticle(draft);

      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/";
        return;
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Loader component
  const Loader = () => (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-6 h-6 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
      <p>Loading...</p>
    </div>
  );

  return (
    <div className="w-full h-full px-4 md:px-8 mt-20">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-blue-700">Hello, {user?.data.first_name}!</h1>
          <p className="text-gray-700 mt-2">
            Welcome to the Unitimate Wrestling and Charity Organization  Dashboard. Stay informed, manage articles, and celebrate the vibrant creativity of Abia State.
          </p>
          <p className="text-gray-500 mt-2 italic">
            "Empowering Artistes, Uniting Patriots, Inspiring Generations."
          </p>
        </div>

        {/* Grid Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 pt-8">
          {/* Show loader if data is loading */}
          {loading ? (
            <div className="w-full flex justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {/* Users */}
              <div className="bg-indigo-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <FiUsers className="text-4xl text-indigo-600" />
                <p className="text-indigo-700 font-semibold">Users</p>
                <p className="text-indigo-700 text-sm">{users.length} Registered Users</p>
              </div>

              {/* Blogs */}
              <div className="bg-red-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <FaBlog className="text-4xl text-red-600" />
                   <p className="text-red-700 font-semibold">Articles</p>
                <p className="text-red-700 text-sm"> Published {articlePublish.length}</p>
                  <p className="text-red-700 text-sm"> Draft {draftArticle.length} </p>
              </div>

              {/* Admins */}
              <div className="bg-lime-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <RiAdminLine className="text-4xl text-lime-600" />
                <p className="text-lime-700 font-semibold"> Admins</p> 
                <p className="text-lime-700 text-sm">{adminUsers.length} Admins</p> {/* Display admin users count */}
              </div>

              {/* Comments */}
              <div className="bg-orange-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <FaRegComment className="text-4xl text-orange-600" />
                <p className="text-orange-700 font-semibold">Comments </p>
                <p className="text-orange-700 text-sm ">Pending {pending.length} </p>
                <p className="text-orange-700 text-sm"> Approved {approved.length} </p>
                <p className="text-orange-700 text-sm">Declined {decline.length}</p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="pt-5 pb-5 text-center text-gray-600">
          <p>
            Keep updating articles, engaging with the community, and promoting unity through art.
          </p>
          <p className="font-medium mt-2 text-gray-800">
            UAAFF - *Creativity Meets Patriotism*
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
