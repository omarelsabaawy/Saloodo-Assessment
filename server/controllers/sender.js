const uuid = require('uuid');
const parcels = require('../models/parcels.json');

exports.createParcel = (req, res) => {
    const { pickUpAddress, dropOffAddress } = req.body;

    if (!pickUpAddress || !dropOffAddress) {
        return res.status(401).json({
            error: "All input field should be filled."
        });
    }

    const newParcel = {
        parcelId: uuid.v4(),
        senderId: req.sender.userId,
        senderUsername: req.sender.Username,
        senderPhoneNumber: req.sender.phoneNumber,
        pickUpAddress: pickUpAddress,
        dropOffAddress: dropOffAddress,
        bikerId: "",
        biker: "",
        bikerPhoneNumber: "",
        currentStatus: "Waiting for a Captain",
        parcelStatus: {
            selected: false,
            pickedUp: false,
            onTheWay: false,
            delivered: false
        },
        parcelTimeStamps: {
            pickUpDate: "",
            deliveryDate: ""
        }
    };

    parcels.push(newParcel);

    return res.status(200).json({
        success: true
    });

}

exports.getParcels = (req, res) => {
    const { id } = req.params;

    const userParcels = parcels.filter((parcel) => parcel.senderId === id && !parcel.parcelStatus.delivered);

    const totalParcels = parcels.filter((parcel) => parcel.senderId === id);

    if (userParcels.length > 0) {
        return res.status(200).json({
            parcels: userParcels,
            parcelCount: userParcels.length,
            totalParcelsCount: totalParcels.length
        });
    } else {
        return res.status(200).json({
            parcels: [],
            parcelCount: 0,
            totalParcelsCount: totalParcels.length
        });
    }

}

exports.getPreviousParcels = (req, res) => {
    const { id } = req.params;

    const previousParcels = parcels.filter((parcel) => parcel.senderId === id && parcel.parcelStatus.delivered);

    if (previousParcels.length > 0) {
        return res.status(200).json({
            parcels: previousParcels,
            previousParcelsCount: previousParcels.length
        });
    } else {
        return res.status(200).json({
            parcels: [],
            previousParcelsCount: 0
        });
    }

}