import { configureStore } from '@reduxjs/toolkit'
import templateReducer from '../reducers/templateSlice'
import chatboxReducer from '../reducers/chatboxSlice'

export const store = configureStore({
  reducer: {
    template: templateReducer,
    chatbox: chatboxReducer,
  },
})