import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const generateComponent = async (description,token,sessionId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chat`, 
      {
        params: { description, sessionId }, // Use 'params' for query parameters
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Bearer token to headers
        },
      }
    );
    return { status: 200, res: response.data };
  } catch (error) {
    return { status: 400, message: error?.response?.data?.error };
  }
};
