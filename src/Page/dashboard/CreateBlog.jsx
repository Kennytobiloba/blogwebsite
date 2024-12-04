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
  const [image_file, setImageFiles] = useState([]); // For storing multiple image files
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const [uuid, setUuid] = useState(user.data.uuid);
  const [is_commentable, setIsCommentable] = useState(0);

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
      onChange: async () => {
        const savedData = await editor.save(); // Save the current editor content
        setContent(savedData); // Update the state with the content
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to an array
    console.log("Selected image files:", files);
    setImageFiles(files); // Store multiple files
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
    console.log("Form data", {
      title,
      image_file,
      content,
    });

    // Prepare the form data
    const formData = new FormData();
    image_file.forEach((file) => formData.append("image_file[]", file)); // Append each image file under "image_file[]"
    formData.append("title", title);
    formData.append("uuid", uuid);
    formData.append("status", status); 
    formData.append("is_commentable", is_commentable); 
    formData.append("content", JSON.stringify(content));

    // Send form data to the backend
    const sendData = async () => {
      try {
        console.log("Token being used:", token);
        const cleanToken = token.replace(/^"|"$/g, ""); // Clean token

        const response = await fetch(
          "https://abiodun.techtrovelab.com/api/admin/articles",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${cleanToken}`, // Use the cleaned token
            },
          }
        );

        const data = await response.json();
        // console.log("Data fetched:", data);

        if (response.status === 401) {
          alert("Unauthorized. Please log in again.");
          return;
        }
        if(response.ok){
          toast.success("User created successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          window.location.href = "/dashboard/manageblog";
        }

        if (response.status === 422) {
          alert("Validation failed: " + data.error.message); // Display validation error if any
          return;
        }

        // Handle successful response
        console.log("Article created successfully!");
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };

    sendData();
  };

   

  return (
    <div className="bg-white p-2 md:p-8 mt-20  ">
      <h2 className="text-2xl font-semibold">Create A New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        {/* Title Input */}
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title:</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
            type="text"
            placeholder="Ex: Marina del Rey"
            required
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Write your post below here..</p>
            <div id="editorjs" className="border p-4"></div>
          </div>

          {/* Right Sidebar */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose Blog Format</p>
            <div>
              {/* Image Upload */}
              <div className="space-y-4">
                <label className="font-semibold">Blog Cover Images:</label>
                <input
                  onChange={handleImageChange}
                  className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                  type="file"
                  accept="image/*"
                  multiple // Allow multiple images
                />
              </div>

              {/* Status */}
              <div className="space-y-4">
                <label className="font-semibold">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)} // Handle dropdown change
                  className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="w-full mt-5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
          type="submit"
        >
          Add New Blog
        </button>
      </form>
  
      <ToastContainer position="top-right" autoClose={3000}  />

    </div>
  );
};

export default CreateBlog;
