import React, { useState } from 'react'
import { createBook } from '../lib/api'
import '../styles/AddBook.css'

const SUGGESTED_GENRES = ['Fiction', 'Non-Fiction', 'Fantasy', 'Romance', 'Mystery', 'Science Fiction', 'History', 'Biography', 'Children', 'Young Adult', 'Horror', 'Thriller', 'Drama', 'Poetry']

export default function AddBook(){
  const [form, setForm] = useState({
    title: '',
    author: '',
    description: '',
    genres: [],
    isbn: ''
  })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.author.trim()) newErrors.author = 'Author is required'
    if (form.title.length < 3) newErrors.title = 'Title must be at least 3 characters'
    if (form.author.length < 3) newErrors.author = 'Author name must be at least 3 characters'
    if (form.genres.length === 0) newErrors.genres = 'Select at least one genre'
    if (form.isbn && !/^[0-9\-]{10,}$/.test(form.isbn)) newErrors.isbn = 'Invalid ISBN format'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenreToggle = (genre) => {
    setForm(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }))
  }

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ''})
    }
  }

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const payload = {
        ...form,
        genres: form.genres
      }
      await createBook(payload)
      setMessage('✅ Book added successfully! 🎉')
      setForm({ title: '', author: '', description: '', genres: [], isbn: '' })
      setShowPreview(false)
      setShowConfirm(false)
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-book-page">
      <div className="add-book-header">
        <h1>➕ Add a New Book</h1>
        <p className="subtitle">Share your favorite books with the community</p>
      </div>

      <div className="add-book-container">
        <form className="add-book-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>📖 Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter book title"
                maxLength="200"
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
              <div className="char-count">{form.title.length}/200</div>
            </div>

            <div className="form-group">
              <label>✍️ Author *</label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author name"
                maxLength="100"
                className={errors.author ? 'error' : ''}
              />
              {errors.author && <span className="error-message">{errors.author}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>📝 Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about the book... (optional)"
              maxLength="1000"
            ></textarea>
            <div className="char-count">{form.description.length}/1000</div>
          </div>

          <div className="form-group">
            <label>🏷️ Genres *</label>
            {errors.genres && <span className="error-message">{errors.genres}</span>}
            <div className="genre-selector">
              {SUGGESTED_GENRES.map(genre => (
                <label key={genre} className="genre-checkbox">
                  <input
                    type="checkbox"
                    checked={form.genres.includes(genre)}
                    onChange={() => handleGenreToggle(genre)}
                  />
                  <span>{genre}</span>
                </label>
              ))}
            </div>
            {form.genres.length > 0 && (
              <div className="selected-genres">
                {form.genres.map(genre => (
                  <span key={genre} className="selected-genre">
                    {genre}
                    <button
                      type="button"
                      onClick={() => handleGenreToggle(genre)}
                      className="remove-genre"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>📇 ISBN</label>
            <input
              type="text"
              name="isbn"
              value={form.isbn}
              onChange={handleChange}
              placeholder="e.g., 978-0-123456-78-9 (optional)"
              className={errors.isbn ? 'error' : ''}
            />
            {errors.isbn && <span className="error-message">{errors.isbn}</span>}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handlePreview}
              className="preview-btn"
              disabled={loading}
            >
              👁️ Preview
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? '⏳ Adding...' : '✅ Add Book'}
            </button>
          </div>
        </form>

        {showPreview && form.title && form.author && (
          <div className="preview-card">
            <div className="preview-header">
              <h3>📋 Preview</h3>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="close-btn"
              >
                ✕
              </button>
            </div>
            <div className="preview-cover">📖</div>
            <h2>{form.title}</h2>
            <p className="preview-author">By {form.author}</p>
            {form.description && (
              <p className="preview-description">{form.description}</p>
            )}
            <div className="preview-genres">
              {form.genres.map(genre => (
                <span key={genre} className="preview-genre">{genre}</span>
              ))}
            </div>
            {form.isbn && (
              <p className="preview-isbn"><strong>ISBN:</strong> {form.isbn}</p>
            )}
            <button
              type="button"
              onClick={() => {
                setShowConfirm(true)
                setShowPreview(false)
              }}
              className="confirm-btn"
            >
              ✓ Confirm & Add
            </button>
          </div>
        )}

        {showConfirm && (
          <div className="confirm-modal-overlay">
            <div className="confirm-modal">
              <h2>🤔 Confirm Addition</h2>
              <p>Are you sure you want to add this book?</p>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirm(false)
                    setShowPreview(true)
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="confirm-add-btn"
                  disabled={loading}
                >
                  {loading ? '⏳ Adding...' : '✅ Yes, Add It'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {message && (
        <div className={`message-banner ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  )
}
