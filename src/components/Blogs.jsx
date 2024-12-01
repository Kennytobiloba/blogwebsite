import React from 'react';
import imgone from "../assets/imgone.jpg";
import imgtwo from "../assets/imgtwo.jpg";
import imgthree from "../assets/imgthree.jpeg";

const Blogs = () => {
  return (
    <div className="w-full py-10">
      <div className="w-[100%] mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Blog 1 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="p-2">
              <img
                src={imgone}
                alt="Blog 1"
                className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">The Art of Creativity</h2>
              <p className="text-gray-600 mt-2 text-center">
                Discover how art fuels creativity and inspires innovation in everyday life.
              </p>
              <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="p-2">
              <img
                src={imgtwo}
                alt="Blog 2"
                className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">Cultural Heritage</h2>
              <p className="text-gray-600 mt-2 text-center">
                Explore the rich cultural heritage of Abia and how we preserve it through art.
              </p>
              <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="p-2">
              <img
                src={imgthree}
                alt="Blog 3"
                className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">Empowering Communities</h2>
              <p className="text-gray-600 mt-2 text-center">
                Learn how art initiatives empower communities and drive positive change.
              </p>
              <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Blog 4 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="p-2">
              <img
                src={imgone}
                alt="Blog 4"
                className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">Art Exhibitions</h2>
              <p className="text-gray-600 mt-2 text-center">
                A glimpse into our latest art exhibitions and the talented artists behind them.
              </p>
              <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Blog 5 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="p-2">
              <img
                src={imgthree}
                alt="Blog 5"
                className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">Art Exhibitions</h2>
              <p className="text-gray-600 mt-2 text-center">
                A glimpse into our latest art exhibitions and the talented artists behind them.
              </p>
              <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Blog 6 */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="p-2">
              <img
                src={imgtwo}
                alt="Blog 6"
                className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 text-center">Art Exhibitions</h2>
              <p className="text-gray-600 mt-2 text-center">
                A glimpse into our latest art exhibitions and the talented artists behind them.
              </p>
              <div className="text-center">
                <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
