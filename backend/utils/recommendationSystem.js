const Book = require('../models/Book');
const User = require('../models/User');

// Simple Content-Based Filtering Algorithm
// Matches User Preferences matches Book Genres
const getRecommendations = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) return [];

        // 1. Get user's preferred genres and history
        let userInterests = [...user.preferredGenres];
        
        // 2. Add genres from books they actually read and rated highly
        // (This makes the system "learn" dynamically)
        /* 
           Note: In a full implementation, you would populate readingHistory,
           loop through it, and add genres of books rated > 4 to userInterests.
        */

        // 3. Find books that contain these genres
        // excluding books the user has already read
        const readBookIds = user.readingHistory.map(h => h.bookId);

        const recommendedBooks = await Book.find({
            _id: { $nin: readBookIds }, // Exclude read books
            genres: { $in: userInterests } // Must match interests
        })
        .sort({ averageRating: -1 }) // Show highest rated first
        .limit(10); // Return top 10

        return recommendedBooks;

    } catch (error) {
        console.error("Recommendation Error:", error);
        return [];
    }
};

module.exports = { getRecommendations };