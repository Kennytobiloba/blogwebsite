import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  if (!user) {
    window.location.href = "/login";
  }

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [image_file, setImageFiles] = useState([]); // For new images
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState();
  const [uuid, setUuid] = useState(user.uuid);
  const [is_commentable, setIsCommentable] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [article, setArticle] = useState();

  // Fetch the blog data by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const cleanToken = token.replace(/^"|"$/g, "");
        const uuid = id.replace(/^"|"$/g, "");
        
        const response = await fetch(
          `https://abiodun.techtrovelab.com/api/articles/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );
        const data = await response.json();
        
        setArticle(data.data);
        setTitle(data.data.title);
        setStatus(data.data.status);
        setContent(data.data.content);
        setImageFiles(data.data.images || []); // Set existing images (if any)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  // Initialize EditorJS
  useEffect(() => {
    if (loading) return;
  
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
        const contentToRender = typeof content === 'string' ? JSON.parse(content) : content;
        editor.render(contentToRender); // Preload existing content
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
  }, [loading, content]);

  // Handle image changes (new uploads)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // Add new images to the state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const contents = await editorRef.current.save();
    setIsSubmitting(true);
    const formData = new FormData();

    // Append old images (if any) and new images
    image_file.forEach((file) => formData.append("image_file[]", file));

    formData.append("title", title);
    formData.append("status", status);
    formData.append("is_commentable", is_commentable);
    formData.append("content", JSON.stringify(contents));

    const updateBlog = async () => {
      try {
        const cleanToken = token.replace(/^"|"$/g, "");
        const uuid = id.replace(/^"|"$/g, "");
        const response = await fetch(
          `https://abiodun.techtrovelab.com/api/admin/articles/${uuid}`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Blog Updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          window.location.href = "/dashboard/manageblog";
        } else {
          alert("Error: " + data.message);
        }
      } catch (error) {
        console.error("Error updating blog:", error);
        alert("An error occurred while updating the blog.");
      } finally {
        setIsSubmitting(false);
      }
    };

    updateBlog();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="animate-spin h-10 w-10 text-indigo-600"
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
            d="M4 12a8 8 0 018-8V0C3.58 0 0 3.58 0 8h4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className="bg-white md:p-8">
      <h2 className="text-2xl font-semibold">Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
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

        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-xs italic">Edit your post below here..</p>
            <div id="editorjs" className="border p-4"></div>
          </div>
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Blog Settings</p>
            <div>
              <label className="font-semibold">Blog Cover Images:</label>
              <input
                onChange={handleImageChange}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                type="file"
                accept="image/*"
                multiple
              />
              <div className="mt-4 flex flex-wrap gap-4">
                {image_file.length > 0 && image_file.map((file, index) => (
                  <div key={index} className="w-20 h-20 relative">
                    <img
                      src={URL.createObjectURL(file)} 
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
                {article?.images?.map((image, index) => (
                  <div key={index} className="w-20 h-20 relative">
                    <img
                      src={image} 
                      alt={`Existing Image ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="font-semibold">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                required
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className={`w-full mt-5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-md flex items-center justify-center ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
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
                d="M4 12a8 8 0 018-8V0C3.58 0 0 3.58 0 8h4z"
              ></path>
            </svg>
          ) : (
            "Update Blog"
          )}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EditBlog;
