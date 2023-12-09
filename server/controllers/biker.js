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

    selectedParcel.biker = req.biker.bikerName;
    selectedParcel.bikerPhoneNumber = req.biker.phoneNumber;

    selectedParcel.parcelStatus.selected = true;

    selectedParcel.parcelTimeStamps = {
        pickUpDate: pickUpDate,
        deliveryDate: deliveryDate
    };

    selectedParcel.currentStatus = "Waiting for Pickup";

    return res.status(200).json({
        success: true
    });
}

exports.inProgressOrders = (req, res) => {
    const inProgressOrders = parcels.filter((parcel) => parcel.parcelStatus.selected === true);
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

}