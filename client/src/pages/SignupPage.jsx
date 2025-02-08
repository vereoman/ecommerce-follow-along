import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeSlash } from '@phosphor-icons/react';

const SignupPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isSeller, setIsSeller] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                email,
                password,
                name,
                isSeller
            }, {
                withCredentials: true
            });

            if (response.status === 201) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setIsAuthenticated(true);
                navigate("/");
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert(error.response?.data?.message || 'Signup failed');
        }
    };

    const handleGoogleSignup = (e) => {
        e.preventDefault();
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div className="h-screen w-full flex">
            <div className="w-1/2 bg-white p-8 flex items-center justify-center overflow-y-auto">
                <div className="w-full max-w-md">
                    <p className="text-gray-600 mb-8">Please enter your details</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        </div>

                        <div className="flex w-full mt-4">
                            <button
                                type="button"
                                onClick={() => setIsSeller(false)} // Customer First
                                className={`w-full px-4 py-2 rounded-md ${
                                    !isSeller
                                        ? 'border-2 border-blue-600 text-blue-600'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsSeller(true)} // Seller Second
                                className={`w-full px-4 py-2 rounded-md ${
                                    isSeller
                                        ? 'border-2 border-blue-600 text-blue-600'
                                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Seller
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white rounded-md py-3 hover:bg-gray-800 transition-colors mt-6"
                        >
                            Sign up
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    <button
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
                    </button>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a
                            onClick={() => navigate("/login")}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>

            <div className="w-1/2">
                <div
                    className="h-screen w-full bg-cover bg-center relative"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                    <div className="absolute bottom-16 left-16 text-white z-10">
                        <h2 className="text-4xl font-bold mb-4">Bring your ideas to life.</h2>
                        <p className="text-xl">
                            Sign up for free and enjoy access to all features<br />
                            for 30 days. No credit card required.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;