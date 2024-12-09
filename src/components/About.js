import React from "react";
import imgone from "../assets/imgone.jpg";

const About = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col md:flex-row font-roboto justify-between p-0 space-y-6 md:space-y-0 md:space-x-6">
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
        <h2 className="text-lg  md:text-xl font-semibold text-gray-800 mb-2">
          The Ultimate Wrestling and Charity Organization - TUWCO
        </h2>
        <h1 className="font-bold text-[20px] sm:text-3xl md:text-4xl mb-4 hidden lg:block ">
          Championing Legends and Empowering Communities
        </h1>
        <h3 className="text-gray-800 font-medium mb-4 text-md sm:text-lg  hidden lg:block">
          A Legacy of Giving and Empowerment:
        </h3>
        <h3 className="text-gray-800 font-medium mb-4 text-md sm:text-lg   hidden lg:block">
          Honoring Legends through Charity and Wrestling Excellence
        </h3>
        <h3 className="text-gray-800 font-medium mb-4 text-md sm:text-lg">
          Bringing Change through Unity and Strength
        </h3>
        <p className="text-sm sm:text-md md:text-lg text-gray-600 mb-6 lg:text-start text-justify leading-[22px]">
          TUWCO is not just about wrestling, it’s about making a meaningful impact on the lives of people. We are dedicated to empowering communities by discovering raw talents and helping them reach their fullest potential. By providing access to international platforms and infrastructure, we aim to uplift local talents and celebrate their greatness. Alongside this, we focus on humanitarian efforts, such as providing homes for the homeless, bringing essential amenities to underserved rural areas, and creating sustainable infrastructure that connects rural and urban communities.
        </p>

        {/* Key Details Section */}
        <div className="flex gap-4 mt-6">
          <div className="w-8 h-8 rounded-full flex p-2 items-center justify-center border-blue-500">
            <i className="fa-solid fa-check text-blue-600"></i>
          </div>
          <p className="text-sm sm:text-md md:text-lg text-gray-600">
            Empowering communities by uplifting local talents and bringing visibility to raw potential.
          </p>
        </div>

        <div className="flex gap-4 mt-6">
          <div className="w-8 h-8 rounded-full flex p-2 items-center justify-center border-blue-500">
            <i className="fa-solid fa-check text-blue-600"></i>
          </div>
          <p className="text-sm sm:text-md md:text-lg text-gray-600">
            Providing homes, essential services, and creating infrastructure to link rural and urban areas for sustainable growth.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center md:justify-start mt-6 lg:pl-6">
          <button className="bg-blue-700 text-white py-2 px-6 sm:px-8 flex items-center gap-2 rounded hover:bg-blue-800 transition">
            <span>Make a Difference - Donate Now</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
