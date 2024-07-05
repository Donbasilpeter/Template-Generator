import { configureStore } from '@reduxjs/toolkit'
import templateReducer from '../reducers/templateSlice'
import chatboxReducer from '../reducers/chatboxSlice'
import apiKeyReducer from '../reducers/apiSlice'


export const store = configureStore({
  reducer: {
    template: templateReducer,
    apikey: apiKeyReducer,
    chatbox: chatboxReducer,
  },
})