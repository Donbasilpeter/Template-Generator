import { configureStore } from '@reduxjs/toolkit'
import templateReducer from '../reducers/templateSlice'
import authReducer from '../reducers/authSlice';
import sessionReducer from '../reducers/sessionSlice';


export const store = configureStore({
  reducer: {
    template: templateReducer,
    auth: authReducer,
    session:sessionReducer,

  },
})


