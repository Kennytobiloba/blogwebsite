import React, { useState, useEffect } from 'react';
import EditorJSHTML from 'editorjs-html';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';

const editorJSParser = EditorJSHTML();

const SingleBlog = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams(); // Move `useParams` here to avoid potential issues

  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  // console.log(article, "article")
  
  const safeJsonParse = (content) => {
    try {
      return typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e) {
      console.log("Invalid JSON, returning content as text:", content);
      return content;
    }
  };

  // Function to fetch article details
  const getArticle = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://abiodun.techtrovelab.com/api/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError("Failed to fetch article. Please try again.");
        }
        return;
      }

      const data = await response.json();
      if (data?.data?.content) {
        const updatedContent = safeJsonParse(data?.data?.content);
        setArticle({ ...data.data, content: updatedContent });
      } else {
        setArticle(data?.data);
      }

    } catch (error) {
      setError("Failed to fetch article. Please try again.");
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch comments
  const getUserComment = async () => {
    const uuid = id.replace(/^"|"$/g, "");
    console.log("uuid comment", uuid)
    try {
      const response = await fetch(`https://abiodun.techtrovelab.com/api/article/${uuid}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data, "data coment")

      if (response.ok) {
        setComments(data.data);  // Set fetched comments
        getUserComment()
      } else {
        setError("Failed to load comments.");
      }
    } catch (error) {
      setError("Error fetching comments.");
      console.error("Error fetching comments:", error);
    }
  };

  // Fetch article and comments when component is mounted or `id` changes
  useEffect(() => {
    if (id) {
      getArticle();
      getUserComment();
    } else {
      setError("Article ID not found.");
    }
  }, [id]);

  // Render loading, error, or article content
  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center">No article found</div>;
  }

  // If article is fetched successfully, parse content
  let htmlContent = "";
  if (article?.content) {
    htmlContent = editorJSParser.parse(article.content).join('');
  }

  const { title, author, rating, thumbnail } = article;
  const thumbnailUrl =
    thumbnail && thumbnail.length > 0
      ? `https://abiodun.techtrovelab.com${thumbnail[0]}`
      : "https://via.placeholder.com/600"; // Fallback image URL

  const sendData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      const uuid = id.replace(/^"|"$/g, "");
      const response = await fetch(
        `https://abiodun.techtrovelab.com/api/article/${uuid}`, // Adjusted URL to send comment
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        toast.success("Thank you for your comment!", {
          position: "top-right",
          autoClose: 3000,
        });
        setName('');
        setContent('');
      } else {
        const data = await response.json();
        alert("Validation failed: " + data.error.message); // Display validation error if any
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-auto rounded-lg shadow-md mb-6"
          />
          <p className="text-lg mb-6">
            by <span className="text-blue-500 cursor-pointer">{article.user.first_name || 'Admin'}</span>
          </p>
          <div className="space-y-4">
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose prose-lg space-y-4"
            />
          </div>
          <div className="mt-6">
            <span className="text-xl font-medium">Rating:</span>
            <span className="ml-2 text-lg">{rating} (based on 2,370)</span>
          </div>
          <Comment 
            name={name}
            setName={setName} 
            content={content}
            setContent={setContent}
            getComment={sendData} 
            comments={comments}  
            article={article}
          />
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <Footer />
    </>
  );
};

export default SingleBlog;
