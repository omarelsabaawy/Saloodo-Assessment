import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:5000';

export const UpdateParcelStatus = async (status, id, token) => {
    console.log(status)
    try {
        const response = await axios.patch(`${BASE_URL}/biker/parcels/status/${id}`, { status }, {
            headers: {
                Authorization: `${token}`,
            },
        });
        // Assuming your backend returns data of the current parcels not selected by any biker yet.
        const { success, updatedParcel } = response.data;
        return { success, updatedParcel };

    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
        throw error;
    }
};