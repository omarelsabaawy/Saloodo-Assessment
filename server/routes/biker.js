const express = require('express');
const { isBiker } = require('../middlewares/isAuth');
const { getAllRecentOrders, selectAnOrderAndSetTimeStamps, inProgressOrders, updateParcelStatus } = require('../controllers/biker');

const router = express.Router();

router.get('/parcels', isBiker, getAllRecentOrders);

router.get('/inProgressParcels', isBiker, inProgressOrders);

router.post('/parcels/:id', isBiker, selectAnOrderAndSetTimeStamps);

router.patch('/parcels/status/:id', isBiker, updateParcelStatus);

module.exports = router;