import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchBooks } from '../lib/api'
import '../styles/Home.css'

export default function Home(){
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [stats, setStats] = useState({ books: 0, users: 0, genres: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBooks()
      .then(books => {
        const featured = (Array.isArray(books) ? books : []).slice(0, 6)
        setFeaturedBooks(featured)
        setStats({ books: (books || []).length, users: 42, genres: 18 })
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to E-Library System</h1>
          <p>Discover, explore, and manage your favorite books all in one place</p>
          <div className="hero-cta">
            <Link to="/browse" className="cta-primary">🔍 Browse Books</Link>
            <Link to="/add-book" className="cta-secondary">➕ Add Book</Link>
          </div>
        </div>
      </section>

      <section className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <p className="stat-number">{stats.books}</p>
          <p className="stat-label">Books Available</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <p className="stat-number">{stats.users}</p>
          <p className="stat-label">Active Readers</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏷️</div>
          <p className="stat-number">{stats.genres}</p>
          <p className="stat-label">Genres</p>
        </div>
      </section>

      {!loading && featuredBooks.length > 0 && (
        <section className="featured-books">
          <h2>✨ Featured Books</h2>
          <div className="books-grid">
            {featuredBooks.map(book => (
              <div key={book._id} className="featured-card">
                <div className="book-cover">
                  <span className="cover-emoji">📖</span>
                </div>
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                {book.genres && book.genres.length > 0 && (
                  <p className="genres">{book.genres.slice(0, 2).join(', ')}</p>
                )}
                <div className="book-meta">
                  <span className="rating">⭐ {(book.averageRating || 0).toFixed(1)}</span>
                  <span className="borrows">📖 {book.borrowCount || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <section className="features">
        <h2>Why Choose Our Library?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🔍 Smart Search</h3>
            <p>Find books by title, author, genre, or tags instantly</p>
          </div>
          <div className="feature-card">
            <h3>⭐ Ratings & Reviews</h3>
            <p>See what readers think and share your own opinions</p>
          </div>
          <div className="feature-card">
            <h3>📖 Borrowing System</h3>
            <p>Track your borrowed books and manage your collection</p>
          </div>
          <div className="feature-card">
            <h3>💡 Recommendations</h3>
            <p>Get personalized suggestions based on your preferences</p>
          </div>
          <div className="feature-card">
            <h3>👥 Community</h3>
            <p>Connect with other readers and share your journey</p>
          </div>
          <div className="feature-card">
            <h3>📱 Always Available</h3>
            <p>Access your library anytime, anywhere</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Reading Journey?</h2>
          <p>Join thousands of book lovers discovering new worlds</p>
          <Link to="/browse" className="cta-large">Explore Our Library →</Link>
        </div>
      </section>
    </div>
  )
}
