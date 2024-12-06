import {
    createBrowserRouter,  
  } from "react-router-dom";

import Home from "../components/Home";
import App from "../App";
import Login from "../Page/Login";
import Register from "../Page/Register";
import Dashboard from "../Page/Dashboard";
import DashboardHome from "../Page/dashboard/DashboardHome";
import CreateBlog from "../Page/dashboard/CreateBlog";
import ManageBlog from "../Page/dashboard/ManageBlog";
import ManageUser from "../Page/dashboard/ManageUser";
import EditBlog from "../Page/dashboard/EditBlog";
import Profile from "../Page/Profile";
import AdminUserUpdate from "../Page/dashboard/AdminUserUpdate";
import SingleBlog from "../components/SingleBlog";
import AllBlogPage from "../Page/AllBlogPage"
import ManageComment from "../Page/dashboard/ManageComment";
import ForgetPassword from "../Page/ForgetPassword";






   const router = createBrowserRouter([
      {
        path: "/",
        element:<App/>,
        children:[
          {
            path: "/",
            element:<Home/>
          }
        ]
        
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/forgotpassword",
        element:<ForgetPassword/>
      },
      {
        path:"/allblogs",
        element:<AllBlogPage/>
      },
      {
        path:"/singlePage/:id",
        element:<SingleBlog/>
      },
      {
        path:"/dashboard",
        element:<Dashboard/>,
        children:[
          {
            path: "",
            element:<DashboardHome/>
          },
          {
            path: "/dashboard/createpost",
            element:<CreateBlog/>
          },
          {
            path: "/dashboard/manageblog",
            element:<ManageBlog/>
          },
          {
            path: "/dashboard/manageuser",
            element:<ManageUser/>
          },
          {
            path: "/dashboard/Update/:id",
            element:<EditBlog/>
          },
          {
            path:   "/dashboard/userupdate/:id",
            element:<AdminUserUpdate/>
          },
          {
            path:   "/dashboard/comment",
            element:<ManageComment/>
          },

        ]
      },
    
      
      

   ])
    export default router