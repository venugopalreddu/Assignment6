const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Utility function to read users from JSON file
const readUsers = () => {
    if (!fs.existsSync('users.json')) return [];
    const data = fs.readFileSync('users.json');
    return JSON.parse(data);
};

// Utility function to write users to JSON file
const writeUsers = (users) => {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
};

// Route to register a new user
app.post('/register', (req, res) => {
    const { username, email, password, phone } = req.body;

    if (!username || !email || !password || !phone) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let users = readUsers();

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Add the new user
    const newUser = { id: users.length + 1, username, email, password, phone };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// Route to login a user
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const users = readUsers();

    // Find the user with matching username and password
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

// Route to fetch all users
app.get('/users', (req, res) => {
    const users = readUsers();
    res.status(200).json(users);
});

// Root route to redirect to home.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html')); // Serve home.html from public folder
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${3000}`);
});
