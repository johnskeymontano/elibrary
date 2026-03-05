import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Browse from "./pages/Browse"
import UserProfile from "./pages/UserProfile"
import AddBook from "./pages/AddBook"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import "./App.css"

export default function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const user = localStorage.getItem("username")
    if (token && user) {
      setIsAuthenticated(true)
      setUsername(user)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userId")
    localStorage.removeItem("username")
    setIsAuthenticated(false)
    setUsername("")
  }

  return (
    <Router>
      <div className="app">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          username={username}
          onLogout={handleLogout}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
