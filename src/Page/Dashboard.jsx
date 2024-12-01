import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import {
  BsFilterLeft,
  BsX,
  BsHouseDoorFill,
  BsBookmarkFill,
  BsChatLeftTextFill,
  BsChevronDown,
  BsBoxArrowInRight,
  BsSearch,
} from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false); // To toggle sidebar visibility
  const [dropdownVisible, setDropdownVisible] = useState(false); // To toggle dropdown menu

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar Toggle Icon (Always Visible) */}
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer lg:hidden z-50"
        onClick={toggleSidebar}
      >
        <BsFilterLeft className="px-2 bg-gray-900 rounded-md" />
      </span>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 min-w-fit lg:w-[22%] ${
          sidebarVisible ? "block" : "hidden"
        } lg:block`}
      >
        <div
          className={`sidebar fixed top-0 bottom-0 lg:relative p-2 overflow-y-auto text-center bg-gray-900`}
        >
          <div className="text-gray-100 text-xl">
            <div className="p-2.5 mt-1 flex items-center">
              <BsBookmarkFill className="px-2 py-1 rounded-md bg-blue-600" />
              <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                TailwindCSS
              </h1>
              <BsX
                className="cursor-pointer ml-auto lg:hidden"
                onClick={toggleSidebar}
              />
            </div>
            <div className="my-2 bg-gray-600 h-[1px]" />
          </div>

          {/* Search box */}
          <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
            <BsSearch className="text-sm" />
            <input
              type="text"
              placeholder="Search"
              className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
            />
          </div>

          {/* Menu items */}
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <BsHouseDoorFill />
            <Link to="/dashboard" className="text-[15px] ml-4 text-gray-200 font-bold">Home</Link>
          </div>

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <BsBookmarkFill />
            <Link to="/dashboard/createpost" className="text-[15px] ml-4 text-gray-200 font-bold">
              Create a Article
            </Link>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <BsBookmarkFill />
            <Link to="/dashboard/manageblog" className="text-[15px] ml-4 text-gray-200 font-bold">
              Manage Article
            </Link>
          </div>
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <BsBookmarkFill />
            <Link to="/dashboard/manageuser"  className="text-[15px] ml-4 text-gray-200 font-bold">
              Manage User
            </Link>
          </div>
         
          <div className="my-4 bg-gray-600 h-[1px]" />

          {/* Dropdown menu */}
          

          {/* Submenu */}
          {dropdownVisible && (
            <div className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold">
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Social
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Personal
              </h1>
              <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
                Friends
              </h1>
            </div>
          )}

          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
            <BsBoxArrowInRight />
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1  p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
