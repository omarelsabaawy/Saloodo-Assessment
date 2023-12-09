const express = require('express');
const { createParcel, getParcels, getPreviousParcels } = require('../controllers/sender');
const { isSender } = require('../middlewares/isAuth');

const routers = express.Router();

routers.post('/createParcel', isSender, createParcel);

routers.get('/parcels/:id', isSender, getParcels);

routers.get('/previousParcels/:id', isSender, getPreviousParcels);

module.exports = routers;