import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL

export const loginApi = async (email,password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, { email,password}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response?.status===200 && response?.data?.token ){
        return {status : 200, token : response.data.token}
      }
    } catch (error) {
      return{status : 400, message : error?.response?.data?.message}
    }
  };

  export const createAccountApi = async (email,password) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, { email,password}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response?.status===201 && response?.data ){
        return {status : 201, message : response.data.message}
      }
    } catch (error) {
      return {status : 400, message : error?.response?.data?.message}
    }
  };
  