import React from 'react';
import Blogs from './Blogs';

const Article = () => {
  return (
    <div className="w-full bg-gray-800 text-white font-poppins py-20 px-8 mt-10">
      <div className="w-[90%] mx-auto">
        {/* Adjust the grid layout for smaller screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg">Choose Your Article</h4>
            <h1 className="text-[28px] md:text-[37px] leading-normal font-bold">
              United Abia Artistes and Patriots Forum (UAAPF)
            </h1>
          </div>
          <div>
            <p className="text-base md:text-lg">
              Our programs and initiatives are designed to celebrate and support local talent,
              promote cultural heritage, and address pressing community issues. Through art
              exhibitions, music festivals, educational workshops, and community projects, we aim
              to inspire, empower, and enrich the lives of individuals across Abia State.
            </p>
          </div>
        </div>
        {/* Add a grid layout for the second section */}
        <div className="mt-10">
          <Blogs />
        </div>

        {/* Browse More Articles Button */}
        <div className="mt-10 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Browse More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
