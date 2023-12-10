import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000';

export const selectOrderAndSetTimeStamps = async (timeStamps, id, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/biker/parcels/${id}`, timeStamps, {
            headers: {
                Authorization: `${token}`,
            },
        });
        // Assuming your backend returns data of the current parcels not selected by any biker yet.
        const { success } = response.data;
        return success;

    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
        throw error;
    }
};