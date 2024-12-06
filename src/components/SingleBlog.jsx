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
const formatDateTime = (dateTimeString) => {
  if (!dateTimeString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateTimeString).toLocaleDateString(undefined, options);
};

const SingleBlog = () => {
 
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
    setLoading(true);
    try {
    
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
       console.log(data, "data")
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
    try {
      const response = await fetch(`https://abiodun.techtrovelab.com/api/article/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        setError("Failed to load comments.");
        return;
      }
  
      const data = await response.json();
      console.log(data, "data comments");
      setComments(data.data); // Ensure the correct path to the comments in your API response
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

  

  // If article is fetched successfully, parse content
  let htmlContent = "";
  if (article?.content) {
    htmlContent = editorJSParser.parse(article.content).join('');
  }

  
  const thumbnailUrl =
    article?.thumbnail && article?.thumbnail.length > 0
      ? `https://abiodun.techtrovelab.com${article?.thumbnail[0]}`
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
          <h1 className="lg:text-3xl md:text-2xl lg  font-semibold mb-4">{article?.title}</h1>
          <img
            src={thumbnailUrl}
            alt={article?.title}
            className="w-full h-auto rounded-lg shadow-md mb-6"
          />
           <p className="text-sm text-gray-600 mb-4">
            Posted by {article?.user?.first_name || 'Admin'} on{" "}
            <span className="font-medium">{formatDateTime(article?.created_at)}</span>
          </p>
          {article?.updated_at && (
            <p className="text-sm text-gray-500 mb-4">
              Last updated: <span className="font-medium">{formatDateTime(article?.updated_at)}</span>
            </p>
          )}
        
          <div className="space-y-4">
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className="prose prose-lg space-y-4"
            />
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
