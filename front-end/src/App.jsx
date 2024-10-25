import React from 'react'
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App
