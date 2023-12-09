import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080';

export const createNewParcel = async (parcelData, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/sender/createParcel`, parcelData, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data; // Assuming your backend returns success with true, 
    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
        throw error;
    }
};