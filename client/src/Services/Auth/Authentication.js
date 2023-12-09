import axios from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = 'http://localhost:8080';

export const login = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signIn`, userData);
        return response.data; // Assuming your backend returns data with a username and token
    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
    }
};

export const signUp = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/signUp`, userData);
        return response.data; // Assuming your backend returns data with a username and token
    } catch (error) {
        // Handle errors, assuming the backend returns error messages
        toast.error(error.response.data.error);
    }
}