import React from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Navbar({ isAuthenticated, username, onLogout }){
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate("/")
  }

  return (
    <nav className="app-navbar">
      <div className="navbar-content">
        <h1 className="navbar-title"> Library System</h1>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/browse">Browse Books</Link></li>
          <li><Link to="/add-book">Add Book</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          {isAuthenticated ? (
            <>
              <li><span className="navbar-user"> {username}</span></li>
              <li><button onClick={handleLogout} className="navbar-logout">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/signin" className="navbar-signin">Sign In</Link></li>
              <li><Link to="/signup" className="navbar-signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
