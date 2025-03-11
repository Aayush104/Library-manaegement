import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing';

const App = () => {
  return (
    <Router>
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/" element={<Landing />} />
      {/* <Route path="/signup" element={<Signup />} /> */}
    </Routes>
  </Router>
  )
}

export default App
