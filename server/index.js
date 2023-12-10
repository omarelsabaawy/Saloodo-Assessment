// Import necessary modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import the cors middleware

const authRoutes = require('./routes/auth');
const senderRoutes = require('./routes/sender');
const bikerRoutes = require('./routes/biker');

// Load environment variables from a .env file
require('dotenv').config();

// Create an Express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.IO instance attached to the HTTP server
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Middleware to parse JSON requests
app.use(express.json());

// Enable the routers
app.use('/auth', authRoutes);
app.use('/sender', senderRoutes);
app.use('/biker', bikerRoutes);

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('Socket Connected');

    // Socket.IO disconnect event
    socket.on('disconnect', () => {
        console.log('Socket Disconnected');
    });
});

// Start the HTTP server on the specified port or default to 8080
server.listen(process.env.PORT || 8080, () => {
    console.log(`The server is running on port ${process.env.PORT || 8080}`);
});

module.exports = io;