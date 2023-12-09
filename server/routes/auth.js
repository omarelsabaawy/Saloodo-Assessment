const { signIn, signUp } = require('../controllers/auth');

const express = require('express');

const routers = express.Router();

routers.post('/signIn', signIn);

routers.post('/signUp', signUp);

module.exports = routers;