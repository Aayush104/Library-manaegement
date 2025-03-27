import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Faqsection = () => {
  // State to track which FAQ item is open
  const [activeIndex, setActiveIndex] = useState(null);

  // FAQ data organized by categories
  const faqData = [
    {
      category: "Borrowing",
      items: [
        {
          question: "How do I borrow a book?",
          answer: "Visit the library with your library card, browse the shelves, and bring your selected books to the circulation desk. Our staff will help you check out items and explain borrowing limits.",
        },
        {
          question: "What is the borrowing period?",
          answer: "Most books can be borrowed for 21 days. New releases and popular titles may have shorter borrowing periods. You can renew books online or at the circulation desk if no other patrons have requested them.",
        },
        {
          question: "How many books can I borrow at once?",
          answer: "Standard library members can borrow up to 5 books at a time. Premium members and students may have extended borrowing limits.",
        },
      ],
    },
    {
      category: "Digital Resources",
      items: [
        {
          question: "How do I access digital books?",
          answer: "Log in to our online library portal with your library card credentials. You can borrow e-books and audiobooks, which can be read or listened to on various devices.",
        },
        {
          question: "Can I access online databases?",
          answer: "Yes, library members have free access to academic databases, research journals, and digital archives. Access these resources through our website using your library card login.",
        },
        {
          question: "Are there digital resources for students?",
          answer: "We offer extensive digital resources including research databases, academic journals, test preparation materials, and online learning platforms.",
        },
      ],
    },
    {
      category: "Fines & Account",
      items: [
        {
          question: "What happens if I return a book late?",
          answer: "Late returns incur a small daily fine. Books more than 30 days overdue may result in account suspension and replacement fees.",
        },
        {
          question: "How can I check my account status?",
          answer: "Log into your online library account to view borrowed books, due dates, fines, and reservation status. You can also manage your account settings online.",
        },
        {
          question: "Can I reserve books?",
          answer: "Yes, you can reserve books online or at the circulation desk. When the book becomes available, we'll notify you via email or phone.",
        },
      ],
    },
    {
      category: "Library Services",
      items: [
        {
          question: "Do you offer study spaces?",
          answer: "We provide various study areas including quiet study rooms, group study spaces, and computer labs. Reservations can be made online or at the information desk.",
        },
        {
          question: "Are there printing and copying services?",
          answer: "We offer printing, copying, and scanning services. Students and members receive a certain number of free prints per month.",
        },
        {
          question: "Do you host community events?",
          answer: "Our library regularly hosts book clubs, author talks, workshops, reading programs for children, and educational seminars for all age groups.",
        },
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  // Handle FAQ toggle
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <Navbar />
    <div className="bg-gradient-to-br from-sky-50 to-blue-100 min-h-screen p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-sky-600 mb-8 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 10 
          }}
        >
          LIBRARY SERVICES FAQ
        </motion.h1>
          
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {faqData.map((category, categoryIndex) => (
            <motion.div 
              key={categoryIndex}
              variants={categoryVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <motion.h2 
                className="text-xl md:text-2xl font-semibold bg-sky-500 text-white p-4"
                whileHover={{ backgroundColor: "#0284C7" }} // Tailwind sky-600 hover effect
              >
                {category.category}
              </motion.h2>
              
              <div className="divide-y divide-sky-100">
                {category.items.map((item, itemIndex) => {
                  const index = `${categoryIndex}-${itemIndex}`;
                  return (
                    <motion.div 
                      key={itemIndex}
                      variants={itemVariants}
                      className="overflow-hidden"
                    >
                      <motion.button
                        className="flex justify-between items-center w-full p-4 text-left font-medium focus:outline-none hover:bg-sky-50"
                        onClick={() => toggleFAQ(index)}
                        whileHover={{ backgroundColor: "#F0F9FF" }} // Tailwind sky-50 hover effect
                      >
                        <span>{item.question}</span>
                        <motion.span
                          animate={{ rotate: activeIndex === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sky-600"
                        >
                          ▼
                        </motion.span>
                      </motion.button>
                      
                      <AnimatePresence>
                        {activeIndex === index && (
                          <motion.div
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="bg-sky-50 px-4 py-3 text-gray-700"
                          >
                            {item.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 text-center text-gray-600"
        >
          <p>Need more information? Contact our library support at library@support.com</p>
        </motion.div>
      </motion.div>
    
    </div>
    <Footer />
    </>
  );
};

export default Faqsection;