import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [memberType, setMemberType] = useState("reader");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        full_name: fullName,
        email,
        password,
        phone_number: phoneNumber,
        location,
        role: memberType === "librarian" ? "Admin" : "User",
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed! Try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Navbar />
      <ToastContainer />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-xl w-full">
          {/* Header with PageVault Logo */}
          <div className="bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8.8L15.2 4H6C4.9 4 4 4.9 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.3" />
                <path d="M15 4V9H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 13H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 17H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 9H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h1 className="text-3xl font-bold text-white ml-2">PageVault</h1>
            </div>
            <p className="text-blue-100 text-lg">Create your account to access our digital library</p>
          </div>

          {/* Member Type Selection */}
          <div className="bg-sky-100 px-6 py-4 flex justify-center">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  memberType === "reader" 
                    ? "bg-sky-600 text-white" 
                    : "bg-white text-sky-700 hover:bg-sky-50"
                }`}
                onClick={() => setMemberType("reader")}
              >
                Reader
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  memberType === "librarian" 
                    ? "bg-sky-600 text-white" 
                    : "bg-white text-sky-700 hover:bg-sky-50"
                }`}
                onClick={() => setMemberType("librarian")}
              >
                Librarian
              </button>
            </div>
          </div>

          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-sky-500" 
                    placeholder="John Doe" 
                    value={fullName} 
                    onChange={(e) => setFullName(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-sky-500" 
                    placeholder="your@email.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-sky-500" 
                    placeholder="Enter your Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2">Location</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-sky-500" 
                    placeholder="City, Country" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-sky-500" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-sky-500" 
                  placeholder="••••••••" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex items-center mb-6">
                <input 
                  type="checkbox" 
                  className="h-4 w-4 text-sky-500 border-gray-300 rounded" 
                  checked={agreeTerms} 
                  onChange={(e) => setAgreeTerms(e.target.checked)} 
                  required 
                />
                <label className="ml-2 text-sm text-gray-700">
                  I agree to the <a href="#" className="text-sky-600 hover:underline">Terms of Service</a> and <a href="#" className="text-sky-600 hover:underline">Privacy Policy</a>
                </label>
              </div>
              <button 
                type="submit" 
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition duration-150 shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account? <NavLink to="/login" className="font-medium text-sky-600 hover:text-sky-500">Sign in</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;