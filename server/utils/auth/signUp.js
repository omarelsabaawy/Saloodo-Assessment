const uuid = require('uuid');
const { generateToken } = require('../Token/generateToken');

exports.signUpSender = (sendersList, username, password, phoneNumber, res) => {
    const UserExists = sendersList.find(sender => sender.username === username);

    if (UserExists) {
        return res.status(401).json({
            error: 'This username is already exists.'
        });
    }

    const senderId = uuid.v4();
    const newSender = { userId: senderId, username, password, phoneNumber };
    const token = generateToken(senderId, newSender.username, 'sender');
    sendersList.push(newSender);
    console.log({
        id: newSender.userId,
        username: newSender.username,
        userType: 'sender',
        token
    })
    return res.status(200).json({
        id: newSender.userId,
        username: newSender.username,
        userType: 'sender',
        token
    });
}

exports.signUpBiker = (bikersList, username, password, phoneNumber, res) => {
    const bikerExists = bikersList.find(biker => biker.username === username);

    if (bikerExists) {
        return res.status(401).json({
            error: 'This username is already exists.'
        });
    }
    const bikerId = uuid.v4();
    const newBiker = { bikerId: bikerId, bikerName: username, password, phoneNumber };
    bikersList.push(newBiker);
    const token = generateToken(newBiker.bikerId, newBiker.username, 'biker');
    return res.status(200).json({
        id: newBiker.bikerId,
        username: newBiker.bikerName,
        userType: 'biker',
        token
    });
}