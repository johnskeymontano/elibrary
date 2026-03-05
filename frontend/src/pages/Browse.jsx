import React, { useState, useEffect } from 'react'
import { fetchBooks } from '../lib/api'
import '../styles/Browse.css'

export default function Browse(){
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('title')
  const [currentPage, setCurrentPage] = useState(1)
  const [genres, setGenres] = useState([])
  
  const itemsPerPage = 10

  useEffect(() => {
    fetchBooks()
      .then(data => {
        setBooks(Array.isArray(data) ? data : [])
        // Extract unique genres
        const allGenres = new Set()
        data?.forEach(book => {
          if (book.genres && Array.isArray(book.genres)) {
            book.genres.forEach(g => allGenres.add(g))
          }
        })
        setGenres(Array.from(allGenres).sort())
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  // Filter books
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || 
                        (book.genres && book.genres.includes(selectedGenre))
    return matchesSearch && matchesGenre
  })

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title)
    if (sortBy === 'rating') return (b.averageRating || 0) - (a.averageRating || 0)
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt)
    return 0
  })

  // Paginate
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage)
  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>📚 Browse Books</h1>
        <p className="result-count">{sortedBooks.length} books found</p>
      </div>

      <div className="browse-container">
        <aside className="browse-filters">
          <div className="filter-section">
            <h3>🔍 Search</h3>
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>🏷️ Genre</h3>
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value)
                setCurrentPage(1)
              }}
              className="filter-select"
            >
              <option value="all">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="filter-section">
            <h3>⬇️ Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="title">Title (A-Z)</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedGenre('all')
              setSortBy('title')
              setCurrentPage(1)
            }}
            className="reset-btn"
          >
            🔄 Reset Filters
          </button>
        </aside>

        <main className="browse-main">
          {loading ? (
            <div className="loading-state">
              <p>📖 Loading books...</p>
            </div>
          ) : paginatedBooks.length > 0 ? (
            <>
              <div className="books-list">
                {paginatedBooks.map(book => (
                  <div
                    key={book._id}
                    className={`book-item ${selectedBook?._id === book._id ? 'active' : ''}`}
                    onClick={() => setSelectedBook(book)}
                  >
                    <div className="book-item-cover">📖</div>
                    <div className="book-item-info">
                      <h4>{book.title}</h4>
                      <p className="author">{book.author}</p>
                      {book.genres && book.genres.length > 0 && (
                        <p className="genres">{book.genres.slice(0, 2).join(', ')}</p>
                      )}
                      <div className="book-stats">
                        <span>⭐ {(book.averageRating || 0).toFixed(1)}</span>
                        <span>📖 {book.borrowCount || 0} borrows</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="page-btn"
                  >
                    ← Previous
                  </button>
                  <div className="page-info">
                    Page {currentPage} of {totalPages}
                  </div>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="page-btn"
                  >
                    Next →
                  </button>
                </div>
              )}

              {selectedBook && (
                <div className="book-detail-section">
                  <h2>{selectedBook.title}</h2>
                  <p className="detail-author">By {selectedBook.author}</p>
                  <p className="detail-description">{selectedBook.description || 'No description available'}</p>
                  {selectedBook.isbn && <p><strong>ISBN:</strong> {selectedBook.isbn}</p>}
                  {selectedBook.genres && selectedBook.genres.length > 0 && (
                    <div className="detail-genres">
                      <strong>Genres:</strong>
                      <div className="genre-tags">
                        {selectedBook.genres.map(g => (
                          <span key={g} className="genre-tag">{g}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="detail-stats">
                    <div className="stat">
                      <span className="stat-label">Rating</span>
                      <span className="stat-value">⭐ {(selectedBook.averageRating || 0).toFixed(1)}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Times Borrowed</span>
                      <span className="stat-value">📖 {selectedBook.borrowCount || 0}</span>
                    </div>
                  </div>
                  <button className="borrow-btn">📚 Borrow This Book</button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>📭 No books found</p>
              <p className="empty-hint">Try adjusting your filters or search terms</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
