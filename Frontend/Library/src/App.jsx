import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AboutUs from './Pages/AboutUs';
import Faqsection from './Pages/Faqsection';
import Contact from './Pages/Contact';
import Admin from './Pages/Admin';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/FAQ" element={<Faqsection />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Admin" element={<Admin />} />

    </Routes>
  </Router>
  )
}

export default App
