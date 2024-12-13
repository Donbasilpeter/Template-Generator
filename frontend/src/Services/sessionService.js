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

export const getSessionById = async (sessionId, user) => {
  try {
    // Make a GET request to fetch session details by ID
    const response = await axios.get(
      `${BASE_URL}/session/${sessionId}`,
      {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Using token for authorization
        },
      }
    );

    return { status: 200, res: response.data.result };
  } catch (error) {
    return { 
      status: error?.response?.status || 400, 
      message: error?.response?.data?.error || 'An error occurred while fetching session details' 
    };
  }
};


export const deleteSession = async (sessionId,user ) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/session/${sessionId}`, 
      {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Using userId as the token
        },
      }
    );
    return { status: 200, res: response.data.result };
  } catch (error) {
    return { status: error?.response?.status || 400, message: error?.response?.data?.error || 'An error occurred' };
  }
};

export const updateSessionName = async (sessionId, newName, user) => {
  try {
    // Make a PUT request to update the session name
    const response = await axios.put(
      `${BASE_URL}/session/${sessionId}`,
      { newName }, // Payload containing the new session name
      {
        headers: {
          'Authorization': `Bearer ${user.token}`, // Using token for authorization
        },
      }
    );

    return { status: 200, res: response.data.message };
  } catch (error) {
    return {
      status: error?.response?.status || 400,
      message: error?.response?.data?.error || 'An error occurred while updating the session name',
    };
  }
};

