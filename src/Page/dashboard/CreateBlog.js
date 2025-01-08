import React, { useRef, useEffect, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const { user, token } = useSelector((state) => state.auth);
  if (!user) {
    window.location.href = "/login";
  }

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [status, setStatus] = useState("draft");
  // const [content, setContent] = useState("");
  const [uuid, setUuid] = useState(user.data.uuid);
  const [is_commentable, setIsCommentable] = useState(0);
  const [loading, setLoading] = useState(false);

  // Initialize the Editor.js
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
  
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // Append new files to existing files
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = await editorRef.current.save();
    const formData = new FormData();
    // Append each image with unique name in form data
    imageFiles.forEach((file, index) => formData.append(`image_file[${index}]`, file));
    formData.append("title", title);
    formData.append("status", status);
    formData.append("is_commentable", is_commentable);
    formData.append("content", JSON.stringify(content));
    const sendData = async () => {
      setLoading(true);
      try {
        const cleanToken = token.replace(/^"|"$/g, "");
        const response = await fetch(
          "https://abiodun.techtrovelab.com/api/admin/articles",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );

        const data = await response.json();
        // console.log("data", data);

        if (response.status === 401) {
          alert("Unauthorized. Please log in again.");
          return;
        }

        if (response.ok) {
          toast.success("Blog created successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          window.location.href = "/dashboard/manageblog";
        } else if (response.status === 422) {
          alert("Validation failed: " + data.error.message);
        }
      } catch (error) {
        console.error("Error sending data:", error);
      } finally {
        setLoading(false);
      }
    };

    sendData();
  };

  // Revoke image object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imageFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [imageFiles]);

  return (
    <div className="bg-white p-2 md:p-8 mt-20">
      <h2 className="text-2xl font-semibold">Create A New Blog Post</h2>

      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        {/* Blog Title */}
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-100 px-5 py-3"
            type="text"
            placeholder="Ex: Marina del Rey"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start">
          {/* Blog Content */}
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <div id="editorjs" className="border p-4"></div>
          </div>

          <div className="md:w-1/3 w-full border p-5 space-y-5">
            {/* Image Upload */}
            <label className="font-semibold">Blog Cover Images:</label>
            <input
              onChange={handleImageChange}
              className="w-full bg-gray-100 px-5 py-3"
              type="file"
              accept="image/*"
              multiple
            />

            {/* Image Preview */}
            <div className="mt-4 flex flex-wrap gap-4">
              {imageFiles.map((file, index) => (
                <div key={index} className="w-20 h-20 relative">
                  <img
                    src={URL.createObjectURL(file)} 
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ))}
            </div>

            {/* Blog Status */}
            <label className="font-semibold">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-gray-100 px-5 py-3"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className={`w-full mt-5 bg-indigo-600 text-white py-3 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-500"}`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Adding Blog...
            </div>
          ) : (
            "Add New Blog"
          )}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CreateBlog;
