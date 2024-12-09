import { Link } from "react-router-dom";

const Blogs = ({ article }) => {
  // console.log("articlesss", article);
  
  if (!article || article.length === 0) {
    return <p className="text-center text-gray-600">No articles available.</p>;
  }

  return (
    <div className="w-full py-10">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {article.map((item, index) => {
            // Ensure the thumbnail is available and use the first item in the array
            const thumbnailUrl =
              item.thumbnail && item.thumbnail.length > 0
                ? `https://abiodun.techtrovelab.com/${item.thumbnail[0]}`
                : "https://via.placeholder.com/150"; // Fallback image URL

            return (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link to={`/singlePage/${item.uuid}`}>
                  <div className="p-2">
                    <img
                      src={thumbnailUrl}
                      alt={item.title}
                      className="w-[90%] mx-auto h-48 object-cover rounded-lg shadow-md mb-4"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 text-center">{item.title}</h2>
                  
                    <div className="text-center">
                      <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition">
                        Read More
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
