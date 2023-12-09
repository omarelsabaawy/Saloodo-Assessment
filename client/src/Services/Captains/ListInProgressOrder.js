import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080';

export const listInProgressParcels = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/biker/inProgressParcels`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        // Assuming your backend returns data of the current parcels not selected by any biker yet.
        const { orders } = response.data;
        return orders;

    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
        throw error;
    }
};