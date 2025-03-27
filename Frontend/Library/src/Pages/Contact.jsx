import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Footer from '../Components/Footer/Footer'


const Contact = () => {
  localStorage.removeItem("cartItems")
  return (
    <div className="bg-gray-50">
      <Navbar />
      
      {/* Banner with "Contact Us" text overlay */}
      <div className="relative">
        <img src="https://static.vecteezy.com/system/resources/previews/002/294/883/non_2x/digital-library-web-banner-design-students-reading-book-on-online-library-web-online-education-digital-classroom-e-learning-concept-header-or-footer-banner-free-vector.jpg" alt="Library Banner" className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-sky-400 bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wider">Contact KnowledgeHub Library</h1>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-8 items-center rounded-3xl overflow-hidden bg-white shadow-lg">
          {/* Left side with library image */}
          <div className="w-full md:w-1/2 h-full">
            <div className="rounded-full overflow-hidden md:rounded-l-3xl">
            <img 
                src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3" 
                alt="Library interior with bookshelves" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Right side with contact form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Get In Touch</h2>
            
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="tel" 
                    placeholder="Phone Number" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  >
                    <option value="" disabled selected>Inquiry Type</option>
                    <option value="membership">Membership</option>
                    <option value="book-request">Book Request</option>
                    <option value="event">Library Event</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
              </div>
              
              <div>
                <textarea 
                  placeholder="Write your message here..." 
                  rows="5" 
                  className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  I agree to receive library updates and communications
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                SUBMIT INQUIRY
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Contact;