import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChatbox: false,
}

export const chatboxSlice = createSlice({
  name: 'chatbox',
  initialState,
  reducers: {

    setIsChatbox: (state, action) => {
        state.isChatbox = action.payload
    },
    getIsChatbox: (state) => {
          return state.isChatbox
    },
  },

})

// Action creators are generated for each case reducer function
export const { setIsChatbox,getIsChatbox } = chatboxSlice.actions

export default chatboxSlice.reducer