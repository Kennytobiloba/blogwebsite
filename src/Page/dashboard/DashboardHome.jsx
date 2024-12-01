import React, { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { user, token } = useSelector((state) => state.auth); 
  const [users, setUsers] = useState([]);
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true); // Loading state to track data fetching
  
  if (!user) {
    window.location.href = "/login";
  }

  useEffect(() => {
    getUser();
    getAllarticle();
  }, []);

  // Get all users function
  const getUser = async () => {
    try {
      console.log("Token being used:", token); 
      const cleanToken = token.replace(/^"|"$/g, ""); 
      const response = await fetch("https://abiodun.techtrovelab.com/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`, // Use the cleaned token
        },
      });
      
      const data = await response.json();
      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        return;
      }
      setUsers(data.data || []); // Update state with the users data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Get all articles function
  const getAllarticle = async () => {
    try {
      console.log("Token being used:", token); 
      const cleanToken = token.replace(/^"|"$/g, ""); 
      const response = await fetch("https://abiodun.techtrovelab.com/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`, // Use the cleaned token
        },
      });
      
      const data = await response.json();
      console.log("Data fetched: article", data);
      setArticle(data);

      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/";
        return;
      }

      setUsers(data.data || []); // Update state with the users data
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
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
    <div className="w-full h-full px-4 md:px-8">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-blue-700">Hello, {user?.first_name}!</h1>
          <p className="text-gray-700 mt-2">
            Welcome to the United Abia Artistes & Patriots Dashboard. Stay informed, manage articles, and celebrate the vibrant creativity of Abia State.
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
                <p className="text-indigo-700 font-semibold">{users ? users?.length : "0"} Registered Users</p>
              </div>

              {/* Blogs */}
              <div className="bg-red-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <FaBlog className="text-4xl text-red-600" />
                <p className="text-red-700 font-semibold">{article ? article?.data?.length : "0"}  Published Articles</p>
              </div>

              {/* Admins */}
              <div className="bg-lime-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <RiAdminLine className="text-4xl text-lime-600" />
                <p className="text-lime-700 font-semibold">3 Admins</p>
              </div>

              {/* Comments */}
              <div className="bg-orange-100 py-6 w-full rounded-lg shadow-md hover:shadow-lg transition-all space-y-1 flex flex-col items-center">
                <FaRegComment className="text-4xl text-orange-600" />
                <p className="text-orange-700 font-semibold">12 Comments</p>
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
