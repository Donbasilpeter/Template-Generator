import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    code: "",
    isLoading :false,
    sessionId: null,
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
      setIsLoading: (state, action) => {
        state.isLoading = action.payload
      },
      getIsLoading: (state) => {
          return state.isLoading
        },
      setSessionId: (state, action) =>{
        state.sessionId = action.payload
      }
  },

})

// Action creators are generated for each case reducer function
export const { setTemplate, getTemplate,setIsLoading,getIsLoading,setSessionId } = templateSlice.actions

export default templateSlice.reducer