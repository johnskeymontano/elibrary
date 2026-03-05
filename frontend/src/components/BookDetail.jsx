import React from 'react'
import '../styles/BookDetail.css'

export default function BookDetail({ book }){
  if (!book) return <div className="book-detail empty">👈 Select a book to view details</div>

  return (
    <div className="book-detail">
      <div className="book-header">
        <h2>{book.title}</h2>
        <p className="meta-author">✍️ {book.author}</p>
      </div>
      
      <div className="book-info">
        {book.description && (
          <section>
            <h3>Description</h3>
            <p>{book.description}</p>
          </section>
        )}
        
        {book.genres && book.genres.length > 0 && (
          <section>
            <h3>Genres</h3>
            <div className="genres">
              {book.genres.map((g, i) => <span key={i} className="genre-tag">{g}</span>)}
            </div>
          </section>
        )}
        
        {book.tags && book.tags.length > 0 && (
          <section>
            <h3>Tags</h3>
            <div className="tags">
              {book.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
            </div>
          </section>
        )}
        
        <section className="stats">
          <div className="stat-item">
            <span className="stat-label">📖 Borrowed</span>
            <span className="stat-value">{book.borrowCount || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">⭐ Rating</span>
            <span className="stat-value">{(book.averageRating || 0).toFixed(2)}</span>
          </div>
        </section>
      </div>
    </div>
  )
}
