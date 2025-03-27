import React, { useState } from "react";
import axios from "axios";
import { Book, Upload, Check, X, Loader2 } from "lucide-react";

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    genre: "",
    isbn: "",
    bookPhoto: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, bookPhoto: file });
    
    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const form = new FormData();
      form.append("bookTitle", formData.bookTitle);
      form.append("author", formData.author);
      form.append("genre", formData.genre);
      form.append("isbn", formData.isbn);
      form.append("bookPhoto", formData.bookPhoto);

      const response = await axios.post("http://localhost:3000/book/add-book", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setFormData({ bookTitle: "", author: "", genre: "", isbn: "", bookPhoto: null });
      setPreviewImage(null);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Clear form
  const clearForm = () => {
    setFormData({ bookTitle: "", author: "", genre: "", isbn: "", bookPhoto: null });
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Book className="w-8 h-8" />
            Add New Book
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Status Messages */}
          {message && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative flex items-center">
              <Check className="w-5 h-5 mr-2" />
              <span>{message}</span>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex items-center">
              <X className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {/* Book Photo Preview */}
          {previewImage && (
            <div className="flex justify-center mb-4">
              <img 
                src={previewImage} 
                alt="Book Preview" 
                className="w-32 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {/* Form Inputs */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                name="bookTitle"
                value={formData.bookTitle}
                onChange={handleChange}
                placeholder="Book Title"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Genre"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="ISBN"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                required
              />
              <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="file"
                name="bookPhoto"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                accept="image/*"
                required
              />
              <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-grow bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center space-x-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Adding...
                </>
              ) : (
                "Add Book"
              )}
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;