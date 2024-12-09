import React from "react";

const Help = () => {
  return (
    <div className="py-10 relative z-40 bottom-24 font-poppins h-auto ">
      <div className="w-[90%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Grid Item 1 */}
        <div className="flex flex-col bg-blue-800 text-white py-10 px-4 rounded-lg shadow-lg">
          <div className="flex gap-2 items-center">
            <span>
              <i className="fa-solid fa-book text-5xl"></i>
            </span>
            <h2 className="text-lg font-semibold">Empowerment:</h2>
          </div>
          <hr className="my-2 mt-4" />
          <div className="text-sm mt-2">
            We aim to provide resources, opportunities, and support to
            individuals and groups, fostering self-sufficiency and success.
          </div>
        </div>

        {/* Grid Item 2 */}
        <div className="flex flex-col bg-black text-white py-10 px-4 rounded-lg shadow-lg">
          <div className="flex gap-2 items-center">
            <span>
              <i className="fa-solid fa-book text-5xl"></i>
            </span>
            <h2 className="text-lg font-semibold">Community Engagement:</h2>
          </div>
          <hr className="my-2 mt-4" />
          <div className="text-sm mt-2">
            We believe in the power of collective action and the importance of
            actively involving community members in our initiatives.
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="flex flex-col bg-white text-black py-10 px-4 rounded-lg shadow-lg">
          <div className="flex gap-2 items-center">
            <span>
              <i className="fa-solid fa-book text-5xl"></i>
            </span>
            <h2 className="text-lg font-semibold">	
            Cultural Heritage & Integrity:</h2>
          </div>
          <hr className="my-2 mt-4" />
          <div className="text-sm mt-2">
          We are dedicated to preserving and celebrating the rich cultural traditions of Abia State. Operate with transparency, honesty, and accountability in all our endeavors.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
