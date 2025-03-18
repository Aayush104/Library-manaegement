import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email.trim(),
        password
      });

      if (response.data.message === "Login successful") {
        toast.success("Login successful! Redirecting...");
        
        // Store user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        
        // Apply remember me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }
    } catch (error) {
      // Handle various error scenarios
      if (error.response) {
        // Server responded with an error status
        switch (error.response.status) {
          case 400:
            toast.error("Please provide both email and password");
            break;
          case 401:
            toast.error("Invalid password");
            break;
          case 404:
            toast.error("No account found with this email");
            break;
          default:
            toast.error("Login failed. Please try again.");
        }
      } else if (error.request) {
        // No response received from server
        toast.error("Cannot connect to server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load remembered email if available
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
          
          {/* Login Header with PageVault Logo and Name */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8.8L15.2 4H6C4.9 4 4 4.9 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.3" />
                <path d="M15 4V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h1 className="text-3xl font-bold text-white ml-2">PageVault</h1>
            </div>
            <p className="text-blue-100 text-lg">Sign in to your library account</p>
          </div>
          
          {/* Login Form */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-sky-500"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:border-sky-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-gray-300 rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <NavLink to="/forgot-password" className="font-medium text-sky-600 hover:text-sky-500">
                    Forgot your password?
                  </NavLink>
                </div>
              </div>
              
              <button
                type="submit"
                className={`w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <NavLink to='/signup' className="font-medium text-sky-600 hover:text-sky-500">
                  Create an account
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;