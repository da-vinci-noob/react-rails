import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import Logout from '../components/Logout'

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  </Router>
)
