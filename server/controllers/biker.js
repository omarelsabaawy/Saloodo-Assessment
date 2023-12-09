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

}

exports.updateParcelStatus = (req, res) => {

}