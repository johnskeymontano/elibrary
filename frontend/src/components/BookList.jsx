import React, { useEffect, useState } from 'react'
import { fetchBooks } from '../lib/api'
import '../styles/BookCard.css'

export default function BookList({ onSelect }){
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    setLoading(true)
    fetchBooks()
      .then(b => {
        setBooks(Array.isArray(b) ? b : [])
        setError(null)
      })
      .catch(e => {
        setError(e.message || 'Failed to load books')
        setBooks([])
      })
      .finally(()=>setLoading(false))
  },[])

  if (loading) return <div className="loading">⏳ Loading books...</div>
  if (error) return <div className="error">❌ Error: {error}</div>
  if (books.length === 0) return <div className="empty">📭 No books found</div>

  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book._id} className="book-card" onClick={()=>onSelect(book)}>
          <h3>{book.title}</h3>
          <p className="author">{book.author}</p>
          <p className="genres">{book.genres && book.genres.slice(0,2).join(', ')}</p>
        </div>
      ))}
    </div>
  )
}
