const express = require('express');
const { isBiker } = require('../middlewares/isAuth');
const { getAllRecentOrders, selectAnOrderAndSetTimeStamps } = require('../controllers/biker');

const router = express.Router();

router.get('/parcels', isBiker, getAllRecentOrders);

router.post('/parcels/:id', isBiker, selectAnOrderAndSetTimeStamps);

module.exports = router;