import React, { useEffect, useState } from 'react';
import Blogs from './Blogs';

import { Link } from 'react-router-dom';


const Article = () => {
  const [article, setArticle] = useState([]);
  console.log("find", article)

 
  
  // Function to safely parse JSON or return the original content if it's not valid JSON
  const safeJsonParse = (content) => {
    try {
      return JSON.parse(content);
    } catch (e) {
      console.log("Invalid JSON, returning content as text:", content);
      return content; // Return the original content if it's not valid JSON
    }
  };

  // Get all articles function
  const getAllarticle = async () => {
    try {
      
      
      const response = await fetch("https://abiodun.techtrovelab.com/api/articles", {
        method: "GET",
       
      });

      if (response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/";
        return;
      }

      const data = await response.json();
      console.log("Data fetched: article", data);

      // Check if 'data' exists and is an array
      if (data && Array.isArray(data.data)) {
        // Parse content for each article in the data array
        const updatedArticles = data.data.map(article => {
          return {
            ...article,
            content: article.content ? safeJsonParse(article.content) : null // Safely parse content
          };
        });
        
        setArticle(updatedArticles); // Set the updated articles state
      }

    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getAllarticle();
  }, []);

  useEffect(() => {
    console.log(article, "article state updated"); // Log whenever the state changes
  }, [article]);

  return (
    <div className="w-full bg-gray-800 text-white font-poppins py-20 px- mt-10">
      <div className="w-[90%] mx-auto">
        {/* Adjust the grid layout for smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg">Explore Our Story</h4>
            <h1 className="text-[28px] md:text-[37px] leading-normal font-bold">
              Empowering Communities Through Creativity and Collaboration
            </h1>
          </div>
          <div>
            <p className="text-base md:text-lg">
              TUWCO is dedicated to discovering and nurturing raw talents, transforming them into world-class celebrities by providing essential infrastructure and connecting them to international platforms. Our mission extends beyond entertainment, as we also focus on uplifting communities by providing homes for the homeless, bringing basic amenities to rural areas, and building infrastructures that connect these areas to urban cities. Through these efforts, we aim to create wealth for the needy, mentor individuals, and raise awareness about the resources that can help improve the lives of the less fortunate.
            </p>
          </div>
        </div>

        {/* Display articles */}
        <div className="mt-10">
          <div>
            <Blogs article={article}/>
          </div>
        </div>

        {/* Browse More Articles Button */}
        <div className="mt-10 text-center">
          <Link to="/allblogs" className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Explore More Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
