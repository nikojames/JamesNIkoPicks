const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Database connection
mongoose.connect('mongodb://localhost/walterclone', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

// Define a User Schema for MongoDB
const userSchema = new mongoose.Schema({
    email: String,
    leagues: Array,
    bets: Array
});
const User = mongoose.model('User', userSchema);

// Middleware to parse incoming JSON
app.use(express.json());

// Route to handle signup
app.post('/api/signup', async (req, res) => {
    const user = new User({ email: req.body.email });
    try {
        await user.save();
        res.status(201).send('User signed up successfully!');
    } catch (err) {
        res.status(400).send('Error signing up user');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
