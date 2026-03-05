const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users (for dev/testing)
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST create user (simple, no hashing for now)
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        const saved = await user.save();
        res.status(201).json({ id: saved._id, username: saved.username, email: saved.email });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
