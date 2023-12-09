const users = require('../models/senders.json');
const captains = require('../models/bikers.json');
const { decodeToken } = require('../utils/Token/verifyToken');

exports.isSender = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json({
                error: 'Unauthorized'
            });
    }

    const user = decodeToken(token);

    if (!user || user.userType !== 'sender') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const sender = users.find((sender) => sender.userId === user.userId);

    if (!sender) {
        return res.status(401).json({ error: 'Sender not found' });
    }

    req.sender = sender;
    next();
}

exports.isBiker = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res
            .status(401)
            .json({
                error: 'Unauthorized'
            });
    }

    const user = decodeToken(token);

    if (!user || user.userType !== 'biker') {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const biker = captains.find((biker) => biker.bikerId === user.userId);

    if (!biker) {
        return res.status(401).json({ error: 'biker not found' });
    }

    req.biker = biker;
    next();
}