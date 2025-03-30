import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Book, 
  Phone, 
  Mail, 
  User, 
  Tag, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  AlertCircle,
  Search,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const [rentRequests, setRentRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/book/getRentRequest");
        setRentRequests(response.data.rentDetails);
        setError(null);
      } catch (error) {
        console.error("Error fetching rent requests:", error);
        setError("Failed to fetch rent requests. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleAction = async (rentId, action) => {
    // Show optimistic UI update
    setRentRequests(prev => 
      prev.map(rent => 
        rent.id === rentId 
          ? { ...rent, status: action === "accept" ? "accepted" : "rejected" } 
          : rent
      )
    );
    
    // Show notification based on action
    if (action === "accept") {
      showNotification("Book request has been accepted", "success");
    } else {
      showNotification("Book request has been rejected", "error");
    }
  };

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const filteredRequests = rentRequests.filter(rent => {
    const matchesSearch = 
      rent.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rent.book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rent.book.genre.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      rent.status === statusFilter ||
      (statusFilter === 'pending' && !rent.status);
    
    return matchesSearch && matchesStatus;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const notificationVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="text-blue-500"
        >
          <RefreshCw size={40} />
        </motion.div>
        <p className="ml-2 text-lg font-medium text-gray-700">Loading requests...</p>
      </div>
    );
  }

  if (error && !rentRequests.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-red-500 mb-4"
        >
          <AlertCircle size={50} />
        </motion.div>
        <h2 className="text-xl font-bold text-gray-800">{error}</h2>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white flex items-center`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={notificationVariants}
          >
            {notification.type === 'success' ? (
              <CheckCircle size={20} className="mr-2" />
            ) : (
              <XCircle size={20} className="mr-2" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800">Book Rental Requests</h1>
          <p className="text-gray-600 mt-2">Manage incoming requests from users</p>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="relative w-full md:w-1/2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search by name, book title, or genre..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'pending' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter('accepted')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'accepted' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Accepted
              </button>
              <button
                onClick={() => setStatusFilter('rejected')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === 'rejected' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Book size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-700">No requests found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 gap-6"
            >
              {filteredRequests.map((rent, index) => (
                <motion.div
                  key={rent.id || index}
                  variants={item}
                  whileHover={{ y: -5 }}
                  className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all ${
                    rent.status === 'accepted' ? 'border-l-4 border-l-green-500' :
                    rent.status === 'rejected' ? 'border-l-4 border-l-red-500' : 'border'
                  }`}
                >
                  <div 
                    className="p-4 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center"
                    onClick={() => toggleExpand(rent.id || index)}
                  >
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 bg-gray-100">
                        {rent.book.bookPhoto ? (
                          <img 
                            src={rent.book.bookPhoto} 
                            alt={rent.book.bookTitle} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
                            <Book size={24} />
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{rent.book.bookTitle}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <User size={14} className="mr-1" />
                          <span className="mr-3">{rent.user.full_name}</span>
                          <Tag size={14} className="mr-1" />
                          <span>{rent.book.genre}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                      {rent.status ? (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          rent.status === 'accepted' ? 'bg-green-100 text-green-800' : 
                          rent.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {rent.status === 'accepted' ? 'Accepted' : 
                           rent.status === 'rejected' ? 'Rejected' : 'Pending'}
                        </span>
                      ) : (
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(rent.id, "accept");
                            }}
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Accept
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(rent.id, "reject");
                            }}
                          >
                            <XCircle size={16} className="mr-1" />
                            Reject
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedItemId === (rent.id || index) && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-100 p-4 bg-gray-50"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">User Information</h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <User size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{rent.user.full_name}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Phone size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{rent.user.phone_number}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Mail size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{rent.user.email}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Book Details</h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm">
                                <Book size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{rent.book.bookTitle}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <Tag size={16} className="mr-2 text-gray-500" />
                                <span className="text-gray-800">{rent.book.genre}</span>
                              </div>
                              {rent.requestDate && (
                                <div className="flex items-center text-sm">
                                  <Calendar size={16} className="mr-2 text-gray-500" />
                                  <span className="text-gray-800">
                                    {new Date(rent.requestDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {!rent.status && (
                          <div className="mt-4 flex justify-end gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                              onClick={() => handleAction(rent.id, "accept")}
                            >
                              <CheckCircle size={18} className="mr-2" />
                              Accept Request
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
                              onClick={() => handleAction(rent.id, "reject")}
                            >
                              <XCircle size={18} className="mr-2" />
                              Reject Request
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;