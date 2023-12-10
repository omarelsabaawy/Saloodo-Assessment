// Import necessary modules
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import the cors middleware

const authRoutes = require('./routes/auth');
const senderRoutes = require('./routes/sender');
const bikerRoutes = require('./routes/biker');
const parcels = require('./models/parcels.json');
const { getAllRecentOrders } = require('./controllers/biker');

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

const connectedBikers = [];

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('Socket Connected ' + socket.id);

    socket.on('bikerConnected', (bikerId) => {
        connectedBikers[bikerId] = socket.id;
        console.log(`Biker ${bikerId} connected`);
    });

    socket.on('createdParcel', () => {
        const recentParcels = parcels.filter((parcel) => !parcel.parcelStatus.selected);
        socket.to(Object.values(connectedBikers)).emit('updateOrders', recentParcels);
    });

    socket.on('bikerSelected', (bikerId) => {
        const connectedBikersArray = Object.values(connectedBikers);
        const otherConnectedBikers = connectedBikersArray.filter(biker => biker.id !== bikerId);
        const recentParcels = parcels.filter((parcel) => !parcel.parcelStatus.selected);
        socket.to(otherConnectedBikers).emit('update recent orders after biker selection', recentParcels);
    });

    // Socket.IO disconnect event
    socket.on('disconnect', () => {
        console.log(`Socket Disconnected`);
    });
});

// Start the HTTP server on the specified port or default to 8080
server.listen(process.env.PORT || 8080, () => {
    console.log(`The server is running on port ${process.env.PORT || 8080}`);
});