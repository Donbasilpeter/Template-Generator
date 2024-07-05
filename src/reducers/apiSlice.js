import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    apiKey :"",
    isApiKey :true
}

export const apiKeySlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setIsApiKey: (state, action) => {
      state.isApiKey = action.payload
    },
    setApiKey: (state, action) => {
        state.isApiKey = action.payload
      },
  },

})

// Action creators are generated for each case reducer function
export const { setIsApiKey,setApiKey } = apiKeySlice.actions

export default apiKeySlice.reducer