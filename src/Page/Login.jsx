import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };
    setLoading(true); // Set loading to true when API request starts

    try {
      const res = await fetch("https://abiodun.techtrovelab.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("login", data);

      if (res.ok) {
        // Successful login
        toast.success('Login Successfully');
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(data.token));
        window.location.href = "/dashboard";
      } else {
        // Error handling: Set the error message from the response
        setErrorMessage(data.error.message || "Failed to login. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Wrong password or email.");
    } finally {
      setLoading(false); // Set loading to false when the API request finishes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Toaster with top-right position */}
      <Toaster position="top-right" />
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Login
        </h2>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm text-center">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading} // Disable the button when loading
          >
            {loading ? (
              <div className="flex justify-center items-center">
                {/* Loader spinner */}
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path d="M4 12a8 8 0 1 1 8 8" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
                Loading...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            You don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
