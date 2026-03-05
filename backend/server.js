const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load config from backend folder
console.log('Starting server...');
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('Dotenv loaded from', path.join(__dirname, '.env'), 'MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Global error handlers to capture async errors and avoid process exit during dev
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason && reason.stack ? reason.stack : reason);
});
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});

// Database connection is disabled by default here so the server can run
// during development even when MongoDB is not running. To enable DB
// connection, set `MONGO_CONNECT=true` in `.env` or start `mongod` and
// remove this guard.
if (process.env.MONGO_CONNECT === 'true') {
    try {
        const connectDB = require('./config/db');
        connectDB().catch(err => console.error('DB connection failed:', err && err.message));
    } catch (err) {
        console.warn('DB module error:', err && err.message);
    }
} else {
    console.warn('DB connection is disabled (set MONGO_CONNECT=true to enable)');
}

// Middleware
app.use(cors()); // Allows React to hit this API
app.use(express.json()); // Parses JSON bodies

// Routes
// Mount book routes safely (handle unexpected export shapes)
try {
    const bookRoutes = require('./routes/bookRoutes');
    console.log('bookRoutes export type:', typeof bookRoutes, 'keys:', Object.keys(bookRoutes || {}));
    if (typeof bookRoutes === 'function' || (bookRoutes && bookRoutes.stack)) {
        app.use('/api/books', bookRoutes);
    } else if (bookRoutes && bookRoutes.default) {
        app.use('/api/books', bookRoutes.default);
    } else {
        console.warn('Skipping /api/books mount — unexpected export from routes/bookRoutes');
    }
} catch (err) {
    console.warn('Error requiring bookRoutes:', err.message);
}

// Mount user routes (should export a router)
try {
    const userRoutes = require('./routes/userRoutes');
    if (typeof userRoutes === 'function' || (userRoutes && userRoutes.stack)) {
        app.use('/api/users', userRoutes);
    } else if (userRoutes && userRoutes.default) {
        app.use('/api/users', userRoutes.default);
    } else {
        console.warn('Skipping /api/users mount — unexpected export from routes/userRoutes');
    }
} catch (err) {
    console.warn('Error requiring userRoutes:', err.message);
}

// Default Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});