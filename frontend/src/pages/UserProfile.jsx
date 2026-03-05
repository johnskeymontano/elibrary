import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../lib/api'
import '../styles/UserProfile.css'

export default function UserProfile(){
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditMode, setShowEditMode] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const username = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    
    if (username) {
      setCurrentUser({ username, userId })
    }

    setLoading(true)
    fetchUsers()
      .then(u => {
        setUsers(Array.isArray(u) ? u : [])
        setError(null)
      })
      .catch(e => {
        setError(e.message)
        setUsers([])
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
    navigate('/signin')
  }

  const handleEditClick = () => {
    setEditForm({
      username: currentUser?.username || '',
      email: '',
      preferredGenres: []
    })
    setShowEditMode(true)
  }

  const handleEditChange = (e) => {
    setEditForm({...editForm, [e.target.name]: e.target.value})
  }

  if (loading) {
    return <div className="loading-state">⏳ Loading profile...</div>
  }

  return (
    <div className="user-profile-page">
      {currentUser ? (
        <>
          <div className="profile-container">
            {/* Current User Profile Section */}
            <div className="my-profile-section">
              <div className="profile-header">
                <h1>👤 My Profile</h1>
                <div className="profile-actions">
                  <button onClick={handleEditClick} className="edit-btn">
                    ✏️ Edit Profile
                  </button>
                  <button onClick={handleLogout} className="logout-btn">
                    🚪 Logout
                  </button>
                </div>
              </div>

              <div className="my-profile-card">
                <div className="profile-avatar">
                  <span>{currentUser.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="profile-info">
                  <h2>{currentUser.username}</h2>
                  <p className="profile-stat">
                    <span className="stat-label">Member ID:</span>
                    <span className="stat-value">{currentUser.userId}</span>
                  </p>
                  <p className="profile-stat">
                    <span className="stat-label">Books Read:</span>
                    <span className="stat-value">📚 12</span>
                  </p>
                  <p className="profile-stat">
                    <span className="stat-label">Average Rating:</span>
                    <span className="stat-value">⭐ 4.5</span>
                  </p>
                  <p className="profile-stat">
                    <span className="stat-label">Member Since:</span>
                    <span className="stat-value">January 2024</span>
                  </p>
                </div>
              </div>

              <div className="reading-stats">
                <h3>📊 Reading Statistics</h3>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-number">12</span>
                    <span className="stat-name">Books Finished</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">3</span>
                    <span className="stat-name">Currently Reading</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">24</span>
                    <span className="stat-name">Borrowed Total</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">4.5</span>
                    <span className="stat-name">Avg Rating Given</span>
                  </div>
                </div>
              </div>

              <div className="preferred-genres">
                <h3>🎯 Your Preferred Genres</h3>
                <div className="genre-list">
                  {['Fiction', 'Mystery', 'Fantasy', 'Science Fiction'].map(genre => (
                    <span key={genre} className="genre-badge">{genre}</span>
                  ))}
                </div>
              </div>

              <div className="reading-history">
                <h3>📖 Reading History</h3>
                <div className="history-timeline">
                  <div className="history-item">
                    <span className="history-date">Dec 15, 2024</span>
                    <span className="history-book">The Great Gatsby</span>
                    <span className="history-rating">⭐⭐⭐⭐⭐</span>
                  </div>
                  <div className="history-item">
                    <span className="history-date">Dec 8, 2024</span>
                    <span className="history-book">To Kill a Mockingbird</span>
                    <span className="history-rating">⭐⭐⭐⭐</span>
                  </div>
                  <div className="history-item">
                    <span className="history-date">Nov 30, 2024</span>
                    <span className="history-book">Pride and Prejudice</span>
                    <span className="history-rating">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Users Section */}
            <div className="community-section">
              <h2>👥 Community Readers</h2>
              {error && <div className="error-message">❌ {error}</div>}
              {users.length === 0 ? (
                <div className="empty-users">
                  <p>No community members yet</p>
                </div>
              ) : (
                <div className="users-list">
                  {users.map(user => (
                    <div 
                      key={user._id} 
                      className={`user-card ${selectedUser?._id === user._id ? 'active' : ''}`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="user-avatar">
                        <span>{user.username.charAt(0).toUpperCase()}</span>
                      </div>
                      <h4>{user.username}</h4>
                      <p className="user-email">{user.email}</p>
                      {user.preferredGenres && user.preferredGenres.length > 0 && (
                        <div className="user-genres">
                          {user.preferredGenres.slice(0, 2).map(genre => (
                            <span key={genre} className="genre-tag">{genre}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {selectedUser && (
                <div className="user-detail-modal">
                  <div className="modal-header">
                    <h3>{selectedUser.username}</h3>
                    <button 
                      onClick={() => setSelectedUser(null)} 
                      className="close-modal-btn"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="modal-content">
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    {selectedUser.preferredGenres && selectedUser.preferredGenres.length > 0 && (
                      <div>
                        <strong>Interested Genres:</strong>
                        <div className="modal-genres">
                          {selectedUser.preferredGenres.map(genre => (
                            <span key={genre} className="modal-genre">{genre}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="not-authenticated">
          <p>👋 Please log in to view your profile</p>
          <button onClick={() => navigate('/signin')} className="signin-link">
            Sign In
          </button>
        </div>
      )}
    </div>
  )
}
