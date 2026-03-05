// 1. Import express and create a router instance
const express = require('express');
const router = express.Router();

// 2. Define your routes (example routes below)
// Example: Get all books
router.get('/', (req, res) => {
    // Logic to fetch books from the database
    res.send('Get all books endpoint');
});

// Example: Get a single book by ID
router.get('/:id', (req, res) => {
    // Logic to fetch one book
    res.send(`Get book with ID: ${req.params.id}`);
});

// 3. EXPORT THE ROUTER INSTANCE
module.exports = router; // <-- THIS LINE IS CRITICAL!