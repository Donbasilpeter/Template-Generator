// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const submitDescription = async (description) => {
  try {
    const response = await axios.post(`${BASE_URL}`, { description,sessionId:"1243"}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.result)
    return response.data.result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
