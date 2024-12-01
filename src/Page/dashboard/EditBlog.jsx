import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useSelector } from "react-redux";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  if (!user) {
    window.location.href = "/login";
  }

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [image_file, setImageFiles] = useState([]);
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState("");
  const [uuid, setUuid] = useState(user.uuid);
  const [is_commentable, setIsCommentable] = useState(0);
  const [loading, setLoading] = useState(true); // For initial data load
   const [article, setArticle] = useState()
   console.log("article", article)


  // Fetch the blog data by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const cleanToken = token.replace(/^"|"$/g, "");
        const response = await fetch(
          `https://abiodun.techtrovelab.com/api/articles`,
          {
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );
        const data = await response.json();
        setArticle(data);
        const filter = article.data.filter((article)=> article.uuid === id)
        console.log("filterd data", filter)
        setTitle(filter?.[0].title);
        setStatus(filter?.[0].status);
        setIsCommentable(filter.is_commentable);
        setContent(filter?.[0].content);
        // setCurrentImage(filter?.[0].image); 
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
        if (content) {
          editor.render(JSON.parse(content)); // Preload existing content
        }
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
        const savedData = await editor.save();
        setContent(savedData); // Save updated content
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [loading, content]);

  // Handle image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  // Update post request
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    image_file.forEach((file) => formData.append("images", file));
    formData.append("title", title);
    formData.append("uuid", uuid);
    formData.append("status", status);
    formData.append("is_commentable", is_commentable);
    formData.append("content", JSON.stringify(content));

    const updateBlog = async () => {
      try {
        const cleanToken = token.replace(/^"|"$/g, "");
        const response = await fetch(
          `https://abiodun.techtrovelab.com/api/admin/articles/${id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: `Bearer ${cleanToken}`,
            },
          }
        );

        if (response.ok) {
          alert("Blog updated successfully!");
          navigate("/dashboard"); // Redirect after success
        } else {
          const errorData = await response.json();
          alert("Error: " + errorData.message);
        }
      } catch (error) {
        console.error("Error updating blog:", error);
      }
    };

    updateBlog();
  };

  if (loading) {
    return <p>Loading...</p>;
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
              <label className="font-semibold mt-4 block">Status:</label>
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full inline-block bg-gray-100 focus:outline-none px-5 py-3"
                type="text"
                placeholder="RoofTops"
                required
              />
            </div>
          </div>
        </div>
        <button
          className="w-full mt-5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-md"
          type="submit"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
