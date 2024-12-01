import React from "react";
import "../components/Button.css";

const Button = () => {
  return (
    <a
      href="#"
      className="button mt-4 flex items-center space-x-2 hover:text-white"
    >
      {/* Left Arrow */}

      {/* Text Label */}
      <span className="label text-sm font-semibold text-white">Donate</span>

      {/* Right Arrow */}
      <i className=" fa-solid fa-arrow-right pt-1 w-5 h-5 transition-transform duration-300 ease-in-out"></i>
    </a>
  );
};

export default Button;
