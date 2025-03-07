// auth.js - Backend for user authentication

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Registration route
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
        username: req.body.username,
        password: hashedPassword
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
});

// Login route
app.post('/login', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user._id;
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.post('/api/chatbot', async (req, res) => {
    const userPrompt = req.body.prompt;
    // Here you can implement your logic to generate a response based on the userPrompt
    const response = `You said: ${userPrompt}`; // Placeholder response
    res.json({ response });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
