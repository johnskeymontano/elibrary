const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    isbn: { type: String },
    
    // Critical for Recommendation Engine
    genres: [{ type: String }], // e.g., ["Sci-Fi", "Dystopian"]
    tags: [{ type: String }],   // e.g., ["Space", "Future", "Robots"]
    
    coverImage: { type: String },
    fileUrl: { type: String }, // Link to PDF
    
    // Stats for "Popularity" Algorithm
    borrowCount: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', bookSchema);