const { generateToken } = require('../Token/generateToken');

exports.signInSender = (sendersList, username, password, res) => {
    // Find the user with the provided username
    const sender = sendersList.find(sender => sender.username === username);

    if (sender && sender.password === password) {
        // Authentication successful, generate JWT token
        const token = generateToken(sender.userId, sender.username, 'sender');
        return res.status(200).json({
            id: sender.userId,
            username: sender.username,
            userType: 'sender',
            token
        });
    } else {
        // Authentication failed
        return res.status(401).json({
            error: 'Invalid credentials'
        });
    }

}

exports.signInBiker = (bikersList, username, password, res) => {
    // Find the user with the provided username
    const biker = bikersList.find(biker => biker.bikerName === username);

    if (biker && biker.password === password) {
        // Authentication successful
        const token = generateToken(biker.bikerId, biker.username, 'biker');
        return res.status(200).json({
            id: biker.bikerId,
            username: biker.bikerName,
            userType: 'biker',
            token
        });
    } else {
        // Authentication failed
        return res.status(401).json({
            error: 'Invalid credentials'
        });
    }

}