import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setEmail } from "../store/store";

const SignupPage = ({ setIsAuthenticated }) => {
  const [email, setEmailState] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        {
          email,
          password,
          name,
          isSeller,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isAuthenticated", "true");
        
        dispatch(setEmail(response.data.user.email));
        
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const handleGoogleSignup = (e) => {
    e.preventDefault();
    window.location.href = `#`;
  };

  return (
    <motion.div
      className="h-screen w-full flex overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-1/2 bg-white p-8 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={itemVariants} className="text-gray-600 mb-8">
            Please enter your details
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div variants={itemVariants}>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmailState(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex w-full mt-4 space-x-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsSeller(false)}
                className={`w-full px-4 py-2 rounded-md ${
                  !isSeller
                    ? "border-2 border-black text-black"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Customer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setIsSeller(true)}
                className={`w-full px-4 py-2 rounded-md ${
                  isSeller
                    ? "border-2 border-black text-black"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Seller
              </motion.button>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-black text-white rounded-md py-3 hover:bg-gray-800 transition-colors mt-6"
            >
              Sign up
            </motion.button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 hover:bg-gray-50 transition-colors"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign up with Google
          </motion.button>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>

      <motion.div
        className="w-1/2 h-full"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div
          className="h-full w-full bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>
      </motion.div>
    </motion.div>
  );
};

export default SignupPage;