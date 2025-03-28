import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in localStorage when component mounts
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Update login state
    setIsLoggedIn(false);
    // Redirect to home or login page
    navigate('/');
  };

  const AuthButton = () => (
    isLoggedIn ? (
      <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        LOGOUT
      </button>
    ) : (
      <NavLink to='/login'>
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded flex items-center cursor-pointer">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          SIGN IN
        </button>
      </NavLink>
    )
  );

  return (
    <nav className="bg-sky-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-xl">P</div>
              <div className="ml-2 font-bold text-xl">
                <span className="text-gray-800">PAGE</span>
                <span className="text-sky-500">VAULT</span>
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Home</NavLink>
            <NavLink to="/AboutUs" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">About Us</NavLink>
            <NavLink to="/Books" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">View Book</NavLink>
            <NavLink to="/FAQ" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">FAQ</NavLink>
            <NavLink to="/Contact" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Contact</NavLink>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-sky-500 focus:outline-none cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                 className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                 className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                 xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium block">Home</NavLink>
          <NavLink to="/AboutUs" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium block">About Us</NavLink>
          <NavLink to="/FAQ" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium block">FAQ</NavLink>
          <NavLink to="/Contact" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium block">Contact</NavLink>
        </div>
        
        {/* Add sign in/logout button to mobile menu as well */}
        <div className="px-2 pt-2 pb-3">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;