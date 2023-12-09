import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080';

export const getParcels = async (id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/sender/parcels/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        // Assuming your backend returns data of Number of current and previous parcels, and the current parcels.
        const { parcels, parcelCount, totalParcelsCount } = response.data;
        return {
            currentParcels: parcelCount,
            totalParcels: totalParcelsCount,
            recentOrders: parcels,
        };

    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
        throw error;
    }
};