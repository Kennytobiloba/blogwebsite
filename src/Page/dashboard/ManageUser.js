import React, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from './Modal';
import { Pagination } from "@mui/material";


const ManageUser = () => {
  
  const [selectUser, setSelectUser] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [is_locked, setIs_locked] = useState("")
  const [pagination, setPagination] = useState();
  const [filters, setFilters] = useState({
    page:1,
    is_locked:"",
    perPage:10
  })
  
  if(!user || !user.data.is_admin){
    window.location.href = "/dashboard"; // Redirect to login if not admin
  }
 
  const {page, is_locked , perPage} = filters
  // console.log("page", perPage)


  const getUser = async () => {
    try {
    
      setLoading(true);
      setError(null);
      const {page, is_locked, perPage} = filters
      let url = `https://abiodun.techtrovelab.com/api/users?page=${page}`;

      if (is_locked) url += `&is_locked=${is_locked}`;
      if (perPage) url += `&perPage=${perPage}`;
      
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });
      const data = await response.json();
      // console.log(data, "data")
      if(response.ok){
        setUsers(data.data || [])
        setPagination(data.pagination);
      }

      if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
        return;
      }

      
    
    } catch (error) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      getUser();
    } else {
      window.location.href = "/login";
    }
  }, [filters]);
  //  filter onchange 
  const handleFilterChange = (e) => {
  const {name, value} = e.target
  setFilters({
    ...filters,
    [name]:value
  })
    
  }

  const handleDelete = async (id) => {
    const userId = id.replace(/^"|"$/g, "");
    try {
      setLoading(true);
      setError(null);
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(`https://abiodun.techtrovelab.com/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });

      if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
        return;
      }

      if (response.ok) {
        toast.success("User deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setUsers((prevUsers) => prevUsers.filter(user => user.uuid !== userId));
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete user. Please try again.");
      }
    } catch (error) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (id, status) => {

    try {
        const cleanToken = token.replace(/^"|"$/g, '');
        const response = await fetch(
            `https://abiodun.techtrovelab.com/api/admin/user-status/${id}?status=locked/${status}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${cleanToken}`,
                },
                body: JSON.stringify({ status }),
            }
        );

        if (response.ok) {
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === id ? { ...user, status } : user
                )
            );
            getUser()
            toast.success('Status updated successfully!');
        } else {
            const errorData = await response.json();
            toast.error(errorData.message || 'Failed to update status.');
        }
    } catch (error) {
        console.error("Error updating status:", error);
        toast.error('Failed to update status.');
    }
};

 
   
  const openModal = (userinfo) => {
    setSelectUser(userinfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectUser(null);
    setIsModalOpen(false);
    
  };

  const handlePageChange = (event, page) => {
    setFilters((prev) => ({ ...prev, page })); // Update filters with the new page
  }
  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <section className="py-1 bg-blueGray-50">
          <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6  rounded">
                 <div className=' flex justify-end gap-6'>
                <select
                className="border rounded p-2"
                name="is_locked"
                value={is_locked}
                onChange={handleFilterChange}
              >
                <option value="">All status</option>
                <option value={0}>Active</option>
                <option value={1}>Locked</option>
              </select>
              
               <Link to="/register" className='px-4 bg-blue-500 py-2 text-white border rounded-md'>Add user</Link>
                 </div>
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">All Users</h3>
                  </div>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                 {
                  users.length > 0 && (
                    <thead>
                    <tr>
                      <th>No.</th>
                      <th>First Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th>Updated At</th>
                      <th>Login At</th>
                      <th>Edit </th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  )
                 }
                  <tbody>
                    {users?.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center py-3">No data available</td>
                      </tr>
                    ) : (
                      users?.map((user, index) => (
                        <tr key={index}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.first_name}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.email}
                          </td>
                          <td
                          onClick={() =>openModal(user)}
                           className="border-t-0 flex gap-1 cursor-pointer px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {user.status || "Inactive"}
                            <CiEdit />
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {new Date(user.updated_at).toLocaleDateString()}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {new Date(user.login_at).toLocaleDateString()}
                          </td>
                          <td className="border-t-0 px-6 flex gap-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <Link to={`/dashboard/userupdate/${user?.uuid}`} className="flex gap-1">
                              <CiEdit className="size-4" />
                              <h6>Edit</h6>
                            </Link>
                          </td>
                          <td
                            onClick={() => handleDelete(user.uuid)}
                            className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                          >
                            <button className="bg-red-600 text-white px-2 py-1">Delete</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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
          </div>
          {isModalOpen && (
          <Modal user={selectUser} onClose={closeModal} onRoleUpdate={handleRoleUpdate} valueone={"active"} valuetwo={"locked"} title={"Status"}/>
          )}
        </section>
      )}

      
      
      <ToastContainer position="top-right" autoClose={3000}  />
    </>
  );
};

export default ManageUser;
