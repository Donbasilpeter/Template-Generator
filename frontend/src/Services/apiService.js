// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const submitDescription = async (description) => {
  try {
    const response = await axios.post(`${BASE_URL}`, { description }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data.message;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
