const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Creator Map API!');
});

// Test Route for MongoDB
app.get('/test-db', async (req, res) => {
    try {
        const mongoose = require('mongoose');
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({
            message: 'Connected to MongoDB!',
            collections: collections.map(col => col.name),
        });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed', details: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
