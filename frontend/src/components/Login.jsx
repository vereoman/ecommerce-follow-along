import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically handle authentication
    // For now, we'll just navigate to the homepage
    navigate("/ecommerce-follow-along/home");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,system-ui,sans-serif]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-white tracking-tight">Welcome</h2>
          <p className="mt-2 text-sm text-gray-400 font-normal">Please sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800 p-8 rounded-xl shadow-2xl">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-2 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                className="mt-2 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-700"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <a href="#" className="text-sm font-medium text-blue-400 hover:text-blue-300">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-150 ease-in-out hover:scale-[1.02]"
          >
            Sign in
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="#" className="text-blue-400 hover:text-blue-300 font-medium">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};