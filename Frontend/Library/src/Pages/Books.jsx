import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book/AllBooks");
        setBooks(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const token  = localStorage.getItem("token");

  let userId;
  if(token)
  {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    userId = decodedToken.id;
  }

  const handleRentRequest = async (bookId) => {
    // Implement rent request logic

console.log("useriD", userId)

    if(!token)
    {
      alert(`Login Before renting...`);
      navigateTo("/login")
      return;
    }
    
const response = await axios.post("http://localhost:3000/book/requestRents",
  {
    userId,
    bookId
  }
)

console.log("response", response);

    console.log(`Rent request for book ${bookId}`);
    alert(`Your Request Has been Submitted`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ 
            repeat: Infinity, 
            duration: 1, 
            ease: "linear" 
          }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading books: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 flex-grow"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Our Book Collection
        </h1>
        
        {books.length === 0 ? (
          <div className="text-center text-gray-500">No books available</div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {books.map((book) => (
              <motion.div
                key={book.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300"
              >
                <div className="relative h-64 w-full">
                  <img 
                    src={book.bookPhoto || '/placeholder-book.png'} 
                    alt={book.bookTitle}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {book.bookTitle}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    by {book.author}
                  </p>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-700">Genre:</span> 
                    <span className="ml-2 text-gray-600">{book.genre}</span>
                  </div>
                  <div className="mb-4">
                    <span className="font-semibold text-gray-700">ISBN:</span> 
                    <span className="ml-2 text-gray-600">{book.isbn}</span>
                  </div>
                  <button 
                    onClick={() => handleRentRequest(book.id)}
                    className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-md hover:bg-blue-600 transition-colors duration-300"
                  >
                    Request to Rent
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Books;