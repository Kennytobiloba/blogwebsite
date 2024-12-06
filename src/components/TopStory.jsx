import React, { useEffect, useState } from 'react';
import Blogs from './Blogs';

const TopStory = () => {
  const [article, setArticle] = useState();
  const [sort, setSort] = useState("desc");

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
     const sortarticle = {
      sort
     }
    try {
      const response = await fetch(`https://abiodun.techtrovelab.com/api/articles?sort=${sort}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data);

      if (data && data.data && Array.isArray(data.data)) {
        // Sort articles by 'createdAt' field in descending order (most recent first)
        const sortedArticles = data.data 
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 6); // Get the 6 most recent articles

        // Parse content safely
        const updatedArticles = sortedArticles.map((article) => {
          return {
            ...article,
            content: article.content ? safeJsonParse(article.content) : null,
          };
        });

        setArticle(updatedArticles);
      }

    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getAllarticle();
  }, []);

  return (
    <div className="w-[90%] mx-auto mt-10 font-poppins">
      <h4 className="text-lg text-center">Top of the story</h4>
      <h1 className="text-4xl font-bold text-center mt-2">The Utimate Wrestling and charity Oranization</h1>

      {article ? (
        <Blogs article={article} />
      ) : (
        <p className="text-center">Loading articles...</p> // Display loading state
      )}
    </div>
  );
};

export default TopStory;
