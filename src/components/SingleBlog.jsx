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
 
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  // console.log("article user", article)

  const { id } = useParams();

  const safeJsonParse = (content) => {
    try {
      return typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e) {
      console.log("Invalid JSON, returning content as text:", content);
      return content;
    }
  };

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

  useEffect(() => {
    
    if (id) {
      getArticle();
      // getUserComment()
      
    } else {
      setError("Article ID not found.");
    }
   
  }, [id]);

  let htmlContent = "";
  if (article?.content) {
    htmlContent = editorJSParser.parse(article.content).join('');
  }

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!article) {
    return <div className="text-center">No article found</div>;
  }

  const { title, author, rating, thumbnail } = article;

  
  const thumbnailUrl =
    thumbnail && thumbnail.length > 0
      ? `https://abiodun.techtrovelab.com${thumbnail[0]}`
      : "https://via.placeholder.com/600"; // Fallback image URL


//  get comment 
const sendData = async () => {
   const formData = {
    name,
    content
   }
   console.log(formData, "comment")
 
  try {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    
    console.log("Token being used:", token);
    const cleanToken = token.replace(/^"|"$/g, ""); // Clean token
    const uuid = id.replace(/^"|"$/g, "");
     console.log("uuid", uuid)
    const response = await fetch(
      `https://abiodun.techtrovelab.com/api/article/${uuid}`,
      {
        method: "POST",
        body:formData,
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
      toast.success("Thank you for your comment,", {
        position: "top-right",
        autoClose: 3000,
      });    
    }
    if (response.status === 422) {
      alert("Validation failed: " + data.error.message); // Display validation error if any
      return;
    }      
  } catch (error) {
    console.error("Error sending data:", error);
  }
};

const getUserComment = async () => { 
 try { 
   console.log("Token being used:", token);
   const cleanToken = token.replace(/^"|"$/g, ""); // Clean token
   const uuid = id.replace(/^"|"$/g, "");
    console.log("uuid", uuid)
   const response = await fetch(
     `https://abiodun.techtrovelab.com/api/article/${uuid}`,
     {
       method: "GET",
       
       headers: {
         Authorization: `Bearer ${cleanToken}`, // Use the cleaned token
       },
     }
   );
   const data = await response.json();
   console.log("Data comment:", data);
   setComments(data.data.comments); 


   if (response.status === 401) {
     alert("Unauthorized. Please log in again.");
     return;
   }
   if(response.ok){
    sendData()
     
   }
   if (response.status === 422) {
     alert("Validation failed: " + data.error.message); // Display validation error if any
     return;
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
          <Comment name={name} 
          setName={setName} 
           content={content}
            setContent={setContent}
            getComment={sendData} />
        </div>
        <ToastContainer position="top-right" autoClose={3000}  />
      </div>
      <Footer/>
    </>
  );
};

export default SingleBlog;
