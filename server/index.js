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
const connectedSenders = [];

// Socket.IO connection event
io.on('connection', (socket) => {

    socket.on('bikerConnected', (bikerId) => {
        connectedBikers[bikerId] = socket.id;
    });

    socket.on('senderConnected', (senderId) => {
        connectedBikers[senderId] = socket.id;
    });

    socket.on('createdParcel', () => {
        const recentParcels = parcels.filter((parcel) => !parcel.parcelStatus.selected);
        socket.to(Object.values(connectedBikers)).emit('updateOrders', recentParcels);
    });

    socket.on('bikerSelected', (bikerId, senderId) => {
        const connectedBikersArray = Object.values(connectedBikers);
        const otherConnectedBikers = connectedBikersArray.filter(biker => biker.id !== bikerId);
        const recentParcels = parcels.filter((parcel) => !parcel.parcelStatus.selected);
        socket.to(otherConnectedBikers).emit('update recent orders after biker selection', recentParcels);
        const connectedSendersArray = Object.values(connectedSenders);
        const specificSender = connectedSendersArray.filter(sender => sender.id !== senderId);
        const senderTotalParcels = parcels.filter((parcel) => parcel.senderId === senderId);
        const senderRecentParcels = parcels.filter((parcel) => parcel.senderId === senderId && !parcel.parcelStatus.delivered);
        const parcelData = {
            currentParcels: senderRecentParcels.length,
            totalParcels: senderTotalParcels.length,
            recentOrders: senderRecentParcels,
        }
        socket.to(specificSender).emit('update recent orders for sender after biker selection', parcelData);
    });

    socket.on('BikerSelectsToDoItem', (senderId) => {
        const connectedSendersArray = Object.values(connectedSenders);
        const specificSender = connectedSendersArray.filter(sender => sender.id !== senderId);
        const senderTotalParcels = parcels.filter((parcel) => parcel.senderId === senderId);
        const senderRecentParcels = parcels.filter((parcel) => parcel.senderId === senderId && !parcel.parcelStatus.delivered);
        const parcelData = {
            currentParcels: senderRecentParcels.length,
            totalParcels: senderTotalParcels.length,
            recentOrders: senderRecentParcels,
        }
        socket.to(specificSender).emit('update recent orders for sender after biker selection', parcelData);
    });

    socket.on('updateInProgress', (bikerId) => {
        const connectedBikersArray = Object.values(connectedBikers);
        const specificBiker = connectedBikersArray.filter(biker => biker.id === bikerId);
        const inProgressParcels = parcels.filter((parcel) => parcel.parcelStatus.selected && !parcel.parcelStatus.delivered);
        socket.to(specificBiker).emit('update recent orders after biker selection', inProgressParcels);
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