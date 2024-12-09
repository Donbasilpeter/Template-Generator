import { configureStore } from '@reduxjs/toolkit'
import templateReducer from '../reducers/templateSlice'
import authReducer from '../reducers/authSlice';


export const store = configureStore({
  reducer: {
    template: templateReducer,
    auth: authReducer,

  },
})


