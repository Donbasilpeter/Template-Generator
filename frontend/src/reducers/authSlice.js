import { createSlice } from '@reduxjs/toolkit';

// Initial state should be based on localStorage (if available)
const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null, // Example user object
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear from localStorage
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
