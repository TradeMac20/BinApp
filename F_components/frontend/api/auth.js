// frontend/api/auth.js
import axios from 'axios';

// IMPORTANT: Replace this with your actual backend URL.
// If running on a physical device, this MUST be your computer's IP address, not 'localhost'.
// Example: 'http://192.168.1.100:5000'
// If running on an Android emulator: 'http://10.0.2.2:5000'
// If running on an iOS simulator: 'http://localhost:5000'
const API_BASE_URL = 'http://172.20.10.2:5000'; // Adjust for your setup

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (userData) => {
  try {
    const response = await authApi.post('/api/auth/signup', userData);
    return response.data;
  } catch (error) {
    // It's good practice to log the error for debugging
    console.error('Error during registration:', error.response?.data || error.message);
    throw error; // Re-throw to be handled by the caller
  }
};

export const login = async (credentials) => {
  try {
    const response = await authApi.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error;
  }
};