import React from "react";
import imgone from "../assets/imgone.jpg";

const About = () => {
  return (
    <div className="w-[90%] mx-auto flex  flex-col md:flex-row font-roboto justify-between p-0 space-y-6 md:space-y-0 md:space-x-6">
      {/* Image Section */}
      <div className="flex-shrink-0 w-full md:w-1/2">
        <img
          src={imgone}
          alt="About Us"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-start mt-8">
        <h2 className="text-lg sm:text-md md:text-xl font-semibold text-gray-800 mb-2">
          United Abia Artistes and Patriots Forum
        </h2>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4">
          UAAPF
        </h1>
        <h3 className="text-gray-800 font-medium mb-4 text-md sm:text-lg">
          Strengthen Communities: To implement programs and projects that
          address local needs, enhance quality of life, and foster community
          cohesion.
        </h3>
        <p className="text-sm sm:text-md md:text-lg text-gray-600 mb-6">
          Founded in 2023, the United Abia Artistes and Patriots Forum (UAAPF)
          is a non-profit organization dedicated to uplifting Abia State through
          the arts and community engagement. We are a collective of passionate
          artists, cultural advocates, and community leaders united by a common
          goal: to use the transformative power of art and creativity to foster
          positive social and economic change.
        </p>
        <div className="flex gap-4 mt-6">
          <div className="w-8 h-8 rounded-full flex p-2 items-center justify-center border-blue-500">
            <i className="fa-solid fa-check text-blue-600"></i>
          </div>
          <p className="text-sm sm:text-md md:text-lg text-gray-600">
            Our mission is to promote and support local artists, celebrate
            Abia’s cultural heritage, and drive positive community development
            through creative and engaging initiatives. We strive to create
            platforms for artistic expression, provide resources for talent
            development, and address community needs through innovative
            projects.
          </p>
        </div>
        <div className="flex justify-center md:justify-start mt-6 lg:pl-6">
          <button className="bg-blue-700 text-white py-2 px-6 sm:px-8 flex items-center gap-2 rounded hover:bg-blue-800 transition">
            <span>Make Your Donation Here</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
