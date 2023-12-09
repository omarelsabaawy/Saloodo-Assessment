const parcels = require('../models/parcels.json');

exports.getAllRecentOrders = (req, res) => {
    const recentOrders = parcels.filter((parcel) => parcel.parcelStatus.selected === false);
    if (recentOrders.length > 0) {
        return res.status(200).json({
            orders: recentOrders
        });
    } else {
        return res.status(200).json({
            orders: []
        });
    }
}

exports.selectAnOrderAndSetTimeStamps = (req, res) => {
    const { id } = req.params;
    const { pickUpDate, deliveryDate } = req.body;

    if (!id) {
        return res.status(401).json({
            error: "Order id should be exists."
        });
    }

    if (!pickUpDate || !deliveryDate) {
        return res.status(401).json({
            error: "All input field should be filled."
        });
    }

    const selectedParcel = parcels.find(parcel => parcel.parcelId === id);

    if (!selectedParcel || selectedParcel.biker !== "") {
        return res.status(404).json({
            error: "Parcel not found."
        });
    }

    selectedParcel.bikerId = req.biker.bikerId;
    selectedParcel.biker = req.biker.bikerName;
    selectedParcel.bikerPhoneNumber = req.biker.phoneNumber;

    selectedParcel.parcelStatus.selected = true;
    selectedParcel.currentStatus = "Waiting for Pickup";

    selectedParcel.parcelTimeStamps = {
        pickUpDate: pickUpDate,
        deliveryDate: deliveryDate
    };

    return res.status(200).json({
        success: true
    });
}

exports.inProgressOrders = (req, res) => {
    const inProgressOrders = parcels.filter((parcel) => parcel.bikerId === req.biker.bikerId && !parcel.parcelStatus.delivered);
    if (inProgressOrders.length > 0) {
        return res.status(200).json({
            orders: inProgressOrders
        });
    } else {
        return res.status(200).json({
            orders: []
        });
    }
}

exports.updateParcelStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
        return res.status(400).json({
            error: "Order id should be provided."
        });
    }

    const selectedParcelIndex = parcels.findIndex(parcel => parcel.parcelId === id);

    if (selectedParcelIndex === -1) {
        return res.status(404).json({
            error: "Parcel not found."
        });
    }

    const selectedParcel = parcels[selectedParcelIndex];

    switch (status) {
        case 'pickedUp':
            if (!selectedParcel.parcelStatus.selected) {
                return res.status(400).json({
                    error: "Parcel has not been selected by a biker yet."
                });
            }
            selectedParcel.parcelStatus.pickedUp = true;
            selectedParcel.currentStatus = "Order In Transit";
            break;

        case 'onTheWay':
            if (!selectedParcel.parcelStatus.pickedUp) {
                return res.status(400).json({
                    error: "Parcel has not been picked up yet."
                });
            }
            selectedParcel.parcelStatus.onTheWay = true;
            selectedParcel.currentStatus = "Order out for Delivery";
            break;

        case 'delivered':
            if (!selectedParcel.parcelStatus.onTheWay) {
                return res.status(400).json({
                    error: "Parcel is not on the way yet."
                });
            }
            selectedParcel.parcelStatus.delivered = true;
            selectedParcel.currentStatus = "Order Delivered";
            break;

        default:
            return res.status(400).json({
                error: "Invalid status provided."
            });
    }

    // Update the status in the array
    parcels[selectedParcelIndex] = selectedParcel;

    return res.status(200).json({
        success: true,
        updatedParcel: selectedParcel
    });
};
