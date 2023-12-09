const express = require('express');
const { isBiker } = require('../middlewares/isAuth');
const { getAllRecentOrders } = require('../controllers/biker');

const router = express.Router();

router.get('/parcels', isBiker, getAllRecentOrders);

module.exports = router;