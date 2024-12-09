import React, { useState, useEffect } from 'react';
import EditorJSHTML from 'editorjs-html';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Comment from './Comment';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';
import { Slide } from '@mui/material'; // Import the Slide component

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
  const [currentSlide, setCurrentSlide] = useState(0); // State to track the current slide

  console.log(article, "article");

  const safeJsonParse = (content) => {
    try {
      return typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e) {
      console.log("Invalid JSON, returning content as text:", content);
      return content;
    }
  };

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
      console.log(data, "data");
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
      setComments(data.data); // Ensure the correct path to the comments in your API response
    } catch (error) {
      setError("Error fetching comments.");
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getArticle();
      getUserComment();
    } else {
      setError("Article ID not found.");
    }
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  let htmlContent = "";
  if (article?.content) {
    htmlContent = editorJSParser.parse(article.content).join('');
  }

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
      const data = await response.json();
      if (response.ok) {
        toast.success("Thank you for your comment!", {
          position: "top-right",
          autoClose: 3000,
        });
        setName('');
        setContent('');
      } else {
        alert("Validation failed: " + data.error.message); // Display validation error if any
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  // Image URLs from the article
  const images = article?.thumbnail || []; // Ensure it's an array of image URLs

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="lg:text-3xl md:text-2xl font-semibold mb-4">{article?.title}</h1>

          Image Slider using Material UI Slide
          {images.length > 0 && (
            <div className="relative w-full h-64 overflow-hidden">
              {images.map((image, index) => (
                <Slide
                  key={index}
                  direction="left"
                  in={currentSlide === index}
                  timeout={500}
                  mountOnEnter
                  unmountOnExit
                >
                  <img
                    src={`https://abiodun.techtrovelab.com${image}`}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </Slide>
              ))}
            </div>
          )}

          {/* Navigation for the images */}
          <div className="flex justify-center space-x-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-500'}`}
              />
            ))}
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Posted by {article?.user?.first_name || 'Admin'} on{" "}
            <span className="font-medium">{formatDateTime(article?.updated_at)}</span>
          </p>

          
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
