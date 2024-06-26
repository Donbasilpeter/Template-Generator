import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    code: "",
    isLoading :false
}

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    setTemplate: (state, action) => {
      state.code = action.payload
    },
    getTemplate: (state) => {
        return state.code
    },
    clearTemplate: (state) => {
        state.code = ""; // Clear the template code
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload
    },
    getIsLoading: (state) => {
          return state.isLoading
    },
  },

})

// Action creators are generated for each case reducer function
export const { setTemplate, getTemplate,setIsLoading,clearTemplate } = templateSlice.actions

export default templateSlice.reducer