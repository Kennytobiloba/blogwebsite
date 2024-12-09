import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);

  if (!user) {
    window.location.href = "/login";
  }

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    description: "",
    gender: "",
    email: "",
    image:"",
  });
  console.log("image", formData.image)
  // console.log("image", formData.image, formData)
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [isImageSelected, setIsImageSelected] = useState(false);
  

  useEffect(() => {
    getUser();
  }, []);

  const userId = user.data.uuid.replace(/^"|"$/g, "");

  const getUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/users/${userId}/view`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }

      const data = await response.json();
      console.log("user data", data)
      setFormData({
        first_name: data.data.user.first_name || "",
        last_name: data.data.user.last_name || "",
        description: data.data.user.description || "",
        email: data.data.user.email || "",
        gender: data.data.user.gender || "",
        image: data.data.user.profile_img || "",
      });
    } catch (err) {
      setError(err.message || "An error occurred while fetching user data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setIsImageSelected(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name || !formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Profile updated successfully!");
        window.location.href = "/dashboard";
      } else {
        throw new Error(data.message || "Failed to update profile.");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while updating the profile.");
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) {
      toast.error("No image selected.");
      return;
    }

    try {
      const cleanToken = token.replace(/^"|"$/g, "");
      const formData = new FormData();
      formData.append("profile_img", profileImage);

      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/users/profile/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cleanToken}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Image uploaded successfully!");
        setIsImageSelected(false);
        setFileInputKey(Date.now()); // Reset the file input
      } else {
        throw new Error(data.message || "Failed to upload image.");
      }
    } catch (err) {
      toast.error(err.message || "Error uploading image.");
    }
  };
  const thumbnailUrl =
  formData.image ? `https://abiodun.techtrovelab.com${formData.image}` : "https://via.placeholder.com/600";

 

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-10 p-6 border rounded-lg shadow-xl bg-white mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-700">
          Profile Information
        </h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex justify-start items-center flex-col">
            <div className="w-40 h-40 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : thumbnailUrl
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex space-x-2">
              <label
                htmlFor="profile_img"
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow-md cursor-pointer hover:bg-blue-700"
              >
                {isImageSelected ? "Change Profile Image" : "Change Profile Image"}
              </label>
              <input
                type="file"
                id="profile_img"
                onChange={handleFileChange}
                key={fileInputKey}
                className="hidden"
              />
            </div>
            {isImageSelected && (
              <button
                type="button"
                onClick={uploadProfileImage}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
              >
                Save Image
              </button>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                className="mt-1 block w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full border rounded-md p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-2"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="mt-4 text-center">
              <Link to="/Resetpassword" className="text-blue-600 hover:underline">
                Reset your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
