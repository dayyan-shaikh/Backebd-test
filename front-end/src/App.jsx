import React from 'react'
import Signup from './Components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<ProtectedRoute Component={ Home }/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
   
  )
}

export default App
