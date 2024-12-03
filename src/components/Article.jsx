import React from 'react';
import Blogs from './Blogs';

const Article = () => {
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
        {/* Add a grid layout for the second section */}
        <div className="mt-10">
          <Blogs />
        </div>

        {/* Browse More Articles Button */}
        <div className="mt-10 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Explore More Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Article;
