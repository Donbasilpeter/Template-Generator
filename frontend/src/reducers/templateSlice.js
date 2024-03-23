import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    code: ""
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
  },
})

// Action creators are generated for each case reducer function
export const { setTemplate, getTemplate } = templateSlice.actions

export default templateSlice.reducer