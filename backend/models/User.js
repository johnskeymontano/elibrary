const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will be hashed later
    
    // User Preferences for Cold Start (when they have no history)
    preferredGenres: [{ type: String }],
    
    // Critical for Collaborative Filtering
    readingHistory: [{
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        rating: { type: Number, min: 1, max: 5 }, // How much they liked it
        interactedAt: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('User', userSchema);