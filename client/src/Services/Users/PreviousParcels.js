import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080';

export const previousParcels = async (id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/sender/previousParcels/${id}`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        // Assuming your backend returns data of Number of current and previous parcels, and the current parcels.
        const { parcels, previousParcelsCount } = response.data;
        return {
            parcels: previousParcelsCount,
            previousOrders: parcels,
        };

    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
    }
};