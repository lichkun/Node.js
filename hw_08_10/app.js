const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

let users = []; 
let refreshTokens = [];

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_LIFETIME });
}

function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFETIME });
    refreshTokens.push(refreshToken);
    return refreshToken;
}

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = { username, password: hashedPassword };
    users.push(user);
    res.status(201).send("User registered!");
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).send('User not found');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(403).send('Incorrect password');
    
    const accessToken = generateAccessToken({ username: user.username });
    const refreshToken = generateRefreshToken({ username: user.username });
    
    res.json({ accessToken, refreshToken });
});

app.post('/api/token', (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(401);
    if (!refreshTokens.includes(token)) return res.sendStatus(403);
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ username: user.username });
        res.json({ accessToken });
    });
});

app.post('/api/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.sendStatus(204);
});

app.get('/api/protected', authenticateToken, (req, res) => {
    res.send('This is a protected route.');
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
