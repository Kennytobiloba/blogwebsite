import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comment = ({ name, content, setContent, setName, getComment, comments, article }) => {

  // Handle the submission of a new comment
  const handlePostComment = () => {
    if (!name || !content) {
      toast.error("Please enter your name and comment.");  // Show error toast
      return;
    }
    
    getComment(name, content); // Pass name and content to the parent function for submission
    setName('');  // Reset the name input field
    setContent('');  // Reset the content input field
  };

  const handleCommentButtonClick = () => {
    if (!article?.commentable) {
      toast.error("Comments are disabled for this article.");  // Show error toast
      return;
    }
    handlePostComment(); // If commentable, proceed with posting the comment
  };

  return (
    <>
     {
      article?.commentable && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 border-b pb-2 border-gray-300">
          Comments
        </h2>
  
        {/* Check if comments exist and render accordingly */}
        {comments &&  comments?.length > 0 ? (
          comments?.map((comment, index) => (
            <div key={index} className="border-b pb-4 mb-6">
              <p className="font-medium text-blue-600">{comment.name}</p>
              <p className="text-gray-700 bg-gray-100 p-4 rounded-lg mt-2 shadow-sm">
                {comment?.content}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(comment?.created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-600 text-center py-4">
            No comments available.
          </div>
        )}
  
        {/* Add new comment form */}
        <div className="mt-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            placeholder="Enter your name"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            placeholder="Add a comment..."
            rows={4}
          ></textarea>
          <button
            onClick={handleCommentButtonClick}  // Use the conditional button handler
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Post Comment
          </button>
        </div>
  
        {/* Toast Container for displaying the toasts */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </div>
      )
    }
    </>
   
   
  );
};

export default Comment;
