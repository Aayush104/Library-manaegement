import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
            <a href="/" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Catalog</a>
            <a href="#" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Resources</a>
            <a href="#" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Events</a>
            <a href="#" className="text-gray-700 hover:text-sky-500 px-3 py-2 font-medium">Contact</a>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
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
          <a href="#" className="text-gray-700 hover:text-sky-500 block px-3 py-2 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-sky-500 block px-3 py-2 font-medium">Catalog</a>
          <a href="#" className="text-gray-700 hover:text-sky-500 block px-3 py-2 font-medium">Resources</a>
          <a href="#" className="text-gray-700 hover:text-sky-500 block px-3 py-2 font-medium">Events</a>
          <a href="#" className="text-gray-700 hover:text-sky-500 block px-3 py-2 font-medium">Contact</a>
        </div>
        
        {/* Add sign in button to mobile menu as well */}
        <div className="px-2 pt-2 pb-3">
          <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded w-full flex items-center justify-center cursor-pointer">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;