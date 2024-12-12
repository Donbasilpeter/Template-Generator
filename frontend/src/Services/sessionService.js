import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

export const getAllSessions = async (user) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/session`, 
      {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Add Bearer token to headers
        },
      }
    );
    return { status: 200, res: response.data.result };
  } catch (error) {
    return { status: 400, message: error?.response?.data?.error };
  }
};

export const updateSession = async (user) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/session`, 
      {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Add Bearer token to headers
        },
      }
    );
    return { status: 200, res: response.data.result };
  } catch (error) {
    return { status: 400, message: error?.response?.data?.error };
  }
};
