import { configureStore } from '@reduxjs/toolkit'
import templateReducer from '../reducers/templateSlice'

export const store = configureStore({
  reducer: {
    template: templateReducer
  },
})