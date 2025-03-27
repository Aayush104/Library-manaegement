import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddBookForm from '../Components/AddBookForm';
import AlllUsers from '../Components/AlllUsers';
import AllBooks from '../Components/AllBooks';

const Admin = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  localStorage.removeItem("cartItems");

  useEffect(() => {
    const fetchData = async() => {
      try {
        setLoading(true);
        const booksResponse = await axios.get("http://localhost:3000/library/get-books");
        const ordersResponse = await axios.get("http://localhost:3000/library/get-orders");
        
        if (booksResponse.data && booksResponse.data.status === "success") {
          setBooks(booksResponse.data.data.books);
        } else {
          setError("Failed to fetch books or invalid data format");
        }

        if (ordersResponse.data && ordersResponse.data.status === "success") {
          setOrders(ordersResponse.data.data.orders);
        } else {
          setError("Failed to fetch orders or invalid data format");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  
  const handleNavClick = (item) => {
    setActiveItem(item);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
  }
  
  // Function to render the appropriate content based on activeItem
  const renderContent = () => {
    switch(activeItem) {
      case 'addBook':
        return <AddBookForm />;
      case 'orders':
        return <OrdersList orders={orders} loading={loading} error={error} />;
      case 'allBooks':
        return <AllBooks />;
      case 'members':
        return <AlllUsers />;
      case 'home':
      default:
        return <Dashboard books={books} orders={orders} loading={loading} error={error} />;
    }
  }
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-sky-600 text-white flex flex-col fixed h-screen">
        <div className="p-5 text-2xl font-bold flex items-center space-x-3 border-b border-blue-500 border-opacity-30 mb-6">
          <div className="ml-2 font-bold text-xl">
            <span>PAGE </span>
            <span>VAULT</span>
          </div>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-500 ${activeItem === 'home' ? 'bg-blue-500' : ''}`}
          onClick={() => handleNavClick('home')}
        >
          <span>🏠</span>
          <span>Dashboard</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-500 ${activeItem === 'orders' ? 'bg-blue-500' : ''}`}
          onClick={() => handleNavClick('orders')}
        >
          <span>📝</span>
          <span>Book Rentals</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-500 ${activeItem === 'addBook' ? 'bg-blue-500' : ''}`}
          onClick={() => handleNavClick('addBook')}
        >
          <span>➕</span>
          <span>Add Book</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-500 ${activeItem === 'allBooks' ? 'bg-blue-500' : ''}`}
          onClick={() => handleNavClick('allBooks')}
        >
          <span>📖</span>
          <span>All Books</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-500 ${activeItem === 'members' ? 'bg-blue-500' : ''}`}
          onClick={() => handleNavClick('members')}
        >
          <span>👥</span>
          <span>Members</span>
        </div>
        
        <div 
          className={`px-5 py-3 flex items-center space-x-3 cursor-pointer hover:bg-blue-500 mt-auto mb-6`}
          onClick={handleLogOut}
        >
          <span>🚪</span>
          <span>LogOut</span>
        </div>
      </div>
      
      {/* Main Content - with left margin to account for fixed sidebar */}
      <div className="flex-1 p-8 ml-64">
        {renderContent()}
      </div>
    </div>
  );
};

// Dashboard component for the home view
const Dashboard = ({ books, orders, loading, error }) => {
  // Get today's date in ISO format for comparison
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate dashboard metrics
  const todaysRentals = orders.filter(order => 
    order.rentalDate.split('T')[0] === today
  ).length;
  
  const pendingRentals = orders.filter(order => order.status === 'Pending').length;
  
  // Calculate total revenue from rentals
  const totalRevenue = orders.reduce((sum, order) => 
    sum + parseFloat(order.rentalFee), 
    0
  ).toFixed(2);
  
  // Latest 5 rentals for the table
  const recentRentals = [...orders].sort((a, b) => 
    new Date(b.rentalDate) - new Date(a.rentalDate)
  ).slice(0, 5);

  // Helper function to format date to time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, Librarian!</h1>
        <span className="text-gray-600">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
      </div>
      
      {/* Loading/Error States */}
      {loading && (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">TODAY'S RENTALS</div>
          <div className="text-3xl font-bold text-gray-800">{todaysRentals}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">PENDING RENTALS</div>
          <div className="text-3xl font-bold text-gray-800">{pendingRentals}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">TOTAL RENTAL REVENUE</div>
          <div className="text-3xl font-bold text-gray-800">${totalRevenue}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">TOTAL BOOKS</div>
          <div className="text-3xl font-bold text-gray-800">{books.length}</div>
        </div>
      </div>
      
      {/* Recent Rentals */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Rentals</h2>
        {loading ? (
          <p className="text-gray-500">Loading rentals...</p>
        ) : error ? (
          <p className="text-red-500">Error loading rentals</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500">No rentals found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Rental ID</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Member</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Book</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Rental Fee</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Time</th>
                  <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRentals.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 px-4 border-b border-gray-100">#{order.id.substring(0, 8)}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{order.memberName}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{order.bookTitle}</td>
                    <td className="py-3 px-4 border-b border-gray-100">Rs.{parseFloat(order.rentalFee).toFixed(2)}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{formatTime(order.rentalDate)}</td>
                    <td className="py-3 px-4 border-b border-gray-100">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

// OrdersList component for the rentals view
const OrdersList = ({ orders, loading, error }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Book Rentals</h1>
      
      {loading ? (
        <p className="text-gray-500">Loading rentals...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No rentals found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Rental ID</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Member</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Book</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Rental Fee</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Rental Date</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Due Date</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Status</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="py-3 px-4 border-b border-gray-100">#{order.id.substring(0, 8)}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{order.memberName}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{order.bookTitle}</td>
                  <td className="py-3 px-4 border-b border-gray-100">${parseFloat(order.rentalFee).toFixed(2)}</td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    {new Date(order.rentalDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    {new Date(order.dueDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};




const AllUsers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/library/get-members");
        if (response.data.status === "success") {
          setMembers(response.data.data.members);
        } else {
          setError("Failed to fetch members");
        }
      } catch (err) {
        setError("Error fetching members: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Library Members</h1>
      
      {loading ? (
        <p className="text-gray-500">Loading members...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : members.length === 0 ? (
        <p className="text-gray-500">No members found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Member ID</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Name</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Email</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Phone</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Membership Date</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Status</th>
                <th className="text-left py-3 px-4 border-b border-gray-200 text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="py-3 px-4 border-b border-gray-100">#{member.id.substring(0, 8)}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{member.name}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{member.email}</td>
                  <td className="py-3 px-4 border-b border-gray-100">{member.phone}</td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    {new Date(member.membershipDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                      member.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b border-gray-100">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;