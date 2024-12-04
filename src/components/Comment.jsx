import React, { useState } from 'react';

const Comment = ({name, content,  setContent, setName , getComment}) => {
 

  const handlePostComment = () => {
    if (!name || !content) {
      alert("Please enter your name and comment.");
      return;
    }
    
    getComment(name, content)
    // alert(`Thank you for your comment, ${name}!`);
    // You can integrate the submission functionality here
    setName('');
    setContent('');
   



  };

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 border-gray-300">
        Comments
      </h2>
      {/* Dummy comment */}
      <div className="border-b pb-4 mb-6">
        <p className="font-medium text-blue-600">John Doe</p>
        <p className="text-gray-700 bg-gray-100 p-3 rounded-lg mt-2">
          This is a dummy comment for this blog post. Great article!
        </p>
        <p className="text-sm text-gray-500 mt-2">Posted on December 4, 2024</p>
      </div>
      {/* Add new comment form */}
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Enter your name"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          placeholder="Add a comment..."
          rows={3}
        ></textarea>
        <button
          onClick={handlePostComment}
          className="bg-blue-500 text-white px-5 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
