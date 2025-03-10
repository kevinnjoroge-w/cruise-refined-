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

app.post('/register', async (req, res) => {
    const connection = create_connection();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(query, [req.body.username, hashedPassword], (error, results) => {
        if (error) {
            return res.status(500).send('Error registering user');
        }
        res.status(201).send('User registered successfully');
    });
    connection.end();
});

app.post('/login', async (req, res) => {
    const connection = create_connection();
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [req.body.username], async (error, results) => {
        if (error) {
            return res.status(500).send('Error logging in');
        }
        if (results.length > 0 && await bcrypt.compare(req.body.password, results[0].password)) {
            req.session.userId = results[0].id; // Assuming 'id' is the primary key
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
    connection.end();
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
