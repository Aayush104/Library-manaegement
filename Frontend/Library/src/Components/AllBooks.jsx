import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, X, Upload } from 'lucide-react';
import axios from 'axios';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    genre: '',
    isbn: '',
    bookPhoto: null,
    existingPhotoUrl: null
  });
  const fileInputRef = useRef(null);

  // Fetch books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/book/AllBooks");
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Prepare book for editing
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      bookTitle: book.bookTitle,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      bookPhoto: null,
      existingPhotoUrl: book.bookPhoto
    });
  };

  // Handle input changes in edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        bookPhoto: file,
        existingPhotoUrl: URL.createObjectURL(file)
      }));
    }
  };

  // Submit book edit
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('bookTitle', formData.bookTitle);
    formDataToSubmit.append('author', formData.author);
    formDataToSubmit.append('genre', formData.genre);
    formDataToSubmit.append('isbn', formData.isbn);
    
    // Only append bookPhoto if a new file is selected
    if (formData.bookPhoto instanceof File) {
      formDataToSubmit.append('bookPhoto', formData.bookPhoto);
    } else {
      // If no new photo, send the existing photo URL
      formDataToSubmit.append('existingBookPhoto', formData.existingPhotoUrl);
    }

    try {
      const response = await axios.post(`http://localhost:3000/book/update-book/${editingBook.id}`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the books list with the new or existing book data
      setBooks(books.map(book => 
        book.id === editingBook.id 
          ? {
              ...book, 
              bookTitle: formData.bookTitle,
              author: formData.author,
              genre: formData.genre,
              isbn: formData.isbn,
              bookPhoto: response.data.bookPhoto || formData.existingPhotoUrl
            } 
          : book
      ));

      setEditingBook(null);
    } catch (err) {
      console.error("Failed to update book", err.response ? err.response.data : err.message);
      // Optionally, show an error message to the user
    }
  };

  // Delete a book
  const handleDelete = async (bookId) => {
    try {
      await axios.post(`http://localhost:3000/book/delete-book/${bookId}`);
      setBooks(books.filter(book => book.id !== bookId));
    } catch (err) {
      console.error("Failed to delete book", err);
    }
  };

  // Loading state
  if (loading) {
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

  // Error state
  if (error) {
    return (
      <div className="text-red-500 text-center mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800"
        >
          Book Collection
        </motion.h1>
      </div>
      
      {/* Books Table */}
      <div className="overflow-x-auto">
        <motion.table 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-white shadow-md rounded-lg overflow-hidden"
        >
          {/* Table Headers */}
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Genre</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ISBN</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200">
            {books.map((book) => (
              <motion.tr 
                key={book.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  scale: 1.01,
                  backgroundColor: '#f9fafb'
                }}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Book Photo */}
                <td className="px-4 py-4">
                  <img 
                    src={book.bookPhoto} 
                    alt={book.bookTitle} 
                    className="w-16 h-20 object-cover rounded-md shadow-sm"
                  />
                </td>
                
                {/* Book Details */}
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{book.bookTitle}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{book.author}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{book.genre}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{book.isbn}</td>
                
                {/* Action Buttons */}
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    <motion.button
                      onClick={() => handleEdit(book)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(book.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Edit Book Modal */}
      <AnimatePresence>
        {editingBook && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setEditingBook(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Book</h2>
              
              {/* Edit Form */}
              <form onSubmit={handleSubmitEdit} className="space-y-4">
                {/* Book Photo Upload */}
                <div className="flex flex-col items-center mb-4">
                  <div className="relative mb-4">
                    <img 
                      src={formData.existingPhotoUrl} 
                      alt="Book Cover" 
                      className="w-32 h-48 object-cover rounded-md shadow-md"
                    />
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                  <input
                    type="text"
                    name="bookTitle"
                    value={formData.bookTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditingBook(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllBooks;