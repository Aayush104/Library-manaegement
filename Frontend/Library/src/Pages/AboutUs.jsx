import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import TestiMonial from '../Components/TestiMonial/TestiMonial';


const AboutUs = () => {
 
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <About />
      <LibrarianSection />
      <SpecialOffer />
      <BookSection />
      <TestiMonial />
      <Footer />
    </div>
  );
};

// Hero Component
const Hero = () => {
  return (
    <div id="home" className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://www.pixel-studios.com/blog/wp-content/uploads/2018/12/012-1200x600.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Knowledge at Your Fingertips
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover, Explore, and Borrow from Our Extensive Collection of Books and Resources.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#books" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Browse Our Collection</a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3" alt="Library interior" className="rounded-lg shadow-xl h-[45rem] w-full object-cover" />
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">About Our Library</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-gray-600 mb-6">
              Welcome to KnowledgeHub Library, a sanctuary of learning and exploration established in 2010. 
              We are dedicated to providing access to a diverse collection of books, digital resources, and educational materials.
            </p>
            <p className="text-gray-600 mb-6">
              Our mission is to foster a love for reading, support lifelong learning, and create a welcoming space 
              for knowledge seekers of all ages and backgrounds.
            </p>
            <p className="text-gray-600 mb-8">
              Led by our Head Librarian, Sarah Thompson, our team is committed to delivering exceptional 
              library services and creating an inspiring environment for learning and discovery.
            </p>
            <a href="#librarians" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">Meet Our Team</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Librarian Section Component
const LibrarianSection = () => {
  const librarians = [
    {
      name: "Sarah Thompson",
      position: "Head Librarian",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3",
      bio: "With over 20 years of library management experience, Sarah leads our team with passion and expertise."
    },
    {
      name: "Michael Chen",
      position: "Digital Resources Manager",
      image: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/4HklMtzrnc9EqloSwGJ3jC/40cb3ea58035109f528beae6ef7edba4/GettyImages-935955188.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000",
      bio: "Michael oversees our digital collections and ensures seamless access to online resources."
    },
    {
      name: "Emily Rodriguez",
      position: "Children's Librarian",
      image: "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/11967303/shutterstock_778139473.jpg?quality=90&strip=all&crop=0.016644474034621%2C0%2C99.966711051931%2C100&w=2400",
      bio: "Emily designs engaging programs and curates collections to inspire young readers."
    }
  ];
  
  return (
    <section id="librarians" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Library Team</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our dedicated librarians are passionate about connecting people with knowledge and supporting community learning.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {librarians.map((librarian, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <img src={librarian.image} alt={librarian.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{librarian.name}</h3>
                <p className="text-gray-500 mb-4">{librarian.position}</p>
                <p className="text-gray-600">{librarian.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Special Offer Component
const SpecialOffer = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">THIS MONTH'S SPECIAL</h2>
            <div className="w-16 h-1 bg-blue-600 mb-6"></div>
            <p className="text-xl mb-6">WELCOME TO KNOWLEDGEHUB</p>
            <p className="text-2xl font-bold text-yellow-500 mb-8">Limited Time Offer</p>
            <div className="inline-block">
              <motion.div
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <span>JOIN NOW</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ9ZBHndd81a069LhRqiLJ8JjI1TUVdjr9Yw&s" alt="Library book collection" className="rounded-lg" />
            <motion.div 
              className="absolute -top-8 right-3 md:-right-8 bg-white text-blue-500 font-bold text-2xl rounded-full w-24 h-20 flex items-center justify-center"
              animate={{ rotate: [0, 15, 0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              30% Off
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Book Section Component
const BookSection = () => {
  const [category, setCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'academic', name: 'Academic' },
    { id: 'children', name: 'Children' }
  ];
  
  const bookItems = [
    { id: 1, name: 'The Great Gatsby', category: 'fiction',  image: 'https://i5.walmartimages.com/seo/The-Great-Gatsby-Hardcover-9781524879761_25185b73-7cc4-45d6-b8bb-adcb4bf6c1f7.3d056f2b8bc1289251ac0e88fca92364.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF' },
    { id: 2, name: 'A Brief History of Time', category: 'non-fiction',  image: 'https://bookbed.org/wp-content/uploads/2022/01/a-brief-history-of-time-stephen-hawking-bookbed.jpg' },
    { id: 3, name: 'Harry Potter Series', category: 'children',  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMoli9qHziEP6BxrXmuLe5wFIqfTBy1hSN7A&s' },
    { id: 4, name: 'Data Science Handbook', category: 'academic',  image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3' },
    { id: 5, name: 'Pride and Prejudice', category: 'fiction', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU5AfrvhPMMEL7WHYy-I3HS9VOWRhhiT4McQ&s' },
    { id: 6, name: 'World Mythology', category: 'non-fiction',  image: 'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_360,c_scale,dpr_1.5/jackets/9780313315053.jpg' }
  ];
  
  const filteredItems = category === 'all' 
    ? bookItems 
    : bookItems.filter(item => item.category === category);
  
  return (
    <section id="books" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">Explore Our Book Collection</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our extensive collection of books across various genres and categories.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                className={`px-6 py-2 rounded-full ${
                  category === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
                onClick={() => setCategory(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {filteredItems.map((item) => (
            <motion.div 
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-lg font-bold text-blue-600">{item.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 capitalize">{item.category}</span>
                 
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Catalog
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;