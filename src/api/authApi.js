import { apiClient } from './apiClient';

// Login
export const login = async ({ prefix, email, password }) => {
  try {
    const payload = { prefix, email, password };
    console.log('Sending login payload:', payload); // Debug log
    const res = await apiClient.post('/api/auth/login', payload);
    return res.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

