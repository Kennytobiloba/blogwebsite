import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";  // Import toast and ToastContainer from React Toastify
import "react-toastify/dist/ReactToastify.css";  // Import toast CSS

const AdminUserUpdate = () => {
  const { user, token } = useSelector((state) => state.auth);

  // Redirect to login if no user is found
  if (!user) {
    window.location.href = "/login";
  }
   const {id} = useParams()

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    description: "",
    gender: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  
  const userId = id.replace(/^"|"$/g, "");

  // Fetch user details when the component mounts
  const getUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const cleanToken = token.replace(/^"|"$/g, ""); // Cleaning the token
      const response = await fetch(`https://abiodun.techtrovelab.com/api/users/${userId}/view`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
      });

      if (response.status === 401) {
        setError("Unauthorized. Please log in again.");
        return;
      }

      const data = await response.json();
      if (data) {
        // Update the form data with the fetched user data
        setFormData({
          first_name: data.data.user.first_name || "",
          last_name: data.data.user.last_name || "",
          description: data.data.user.description || "",
          email: data.data.user.email || "",
          gender: data.data.user.gender || "",
        });
      }
    } catch (error) {
      setError("Failed to fetch user. Please try again.");
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change (if needed for profile image)
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_img: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for required fields
    if (!formData.first_name || !formData.last_name || !formData.description) {
      setError("Please fill in all the required fields.");
      return; // Prevent the form from submitting if validation fails
    }

    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(`https://abiodun.techtrovelab.com/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // Ensure correct Content-Type
          Authorization: `Bearer ${cleanToken}`,
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });
      const data = await response.json();
      console.log(data, "dataaaa");
      if (response.ok) {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        setError(data.message || "Failed to update profile.");
        toast.error(data.message || "Failed to update profile.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      setError("An error occurred while updating the profile.");
      toast.error("An error occurred while updating the profile.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-xl bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">Profile Information</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4">
          {/* First Name */}
          <div className="flex flex-col w-full sm:w-full">
            <label htmlFor="first_name" className="text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              required
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-full sm:w-full">
            <label htmlFor="last_name" className="text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col w-full sm:w-full">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col w-full sm:w-full">
            <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="Tell us about yourself..."
              required
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col w-full sm:w-full">
            <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col w-full sm:w-full">
            <label htmlFor="profile_img" className="text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              id="profile_img"
              name="profile_img"
              onChange={handleFileChange}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* ToastContainer positioned top right */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminUserUpdate;
