import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar/Navbar";
import image from "../assets/Landingbg.png";
import Footer from "../Components/Footer/Footer";

const Landing = () => {
  const features = [
    {
      title: "Catalog Management",
      description: "Easily organize and search your entire collection",
    },
    {
      title: "Member Portal",
      description: "Seamless account management and borrowing history",
    },
    {
      title: "Analytics Dashboard",
      description: "Track popularity and optimize your collection",
    },
  ];

  return (

    <>
        <div className="min-h-screen flex flex-col relative">
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[55rem] bg-cover bg-center flex items-center relative overflow-hidden"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Main Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Welcome to PageVault
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xl md:text-2xl text-white mb-8"
            >
              Discover, manage, and explore your literary world with our modern
              library management system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium mr-4 transition duration-300"
              >
                Get Started
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium transition duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="py-16 bg-gray-900 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 * index }}
                className="p-6 bg-gray-800 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Prompt */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
     
      </motion.div>
   
    </div>
    <Footer />
    </>
  );
};

export default Landing;
