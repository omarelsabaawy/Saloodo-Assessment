const users = require('../models/senders.json');
const captains = require('../models/bikers.json');
const { signInSender, signInBiker } = require('../utils/auth/signIn');
const { signUpSender, signUpBiker } = require('../utils/auth/signUp');

exports.signIn = (req, res) => {
    const { username, password, userType } = req.body;

    if (!username || !password || !userType) {
        return res.status(401).json({
            error: "All input field should be filled."
        });
    }

    try {
        if (userType === "User") {
            signInSender(users, username, password, res);
        } else {
            signInBiker(captains, username, password, res);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.signUp = (req, res) => {
    const { username, password, phoneNumber, userType } = req.body;

    if (!username || !password || !phoneNumber || !userType) {
        return res.status(401).json({
            error: "All input field should be filled."
        });
    }

    try {
        if (userType === "User") {
            signUpSender(users, username, password, phoneNumber, res);
        } else {
            signUpBiker(captains, username, password, phoneNumber, res);
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }

}
