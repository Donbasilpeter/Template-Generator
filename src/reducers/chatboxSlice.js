import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChatbox: false,
    description: []
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
    setDescription: (state, action) => {
        state.description.push(action.payload)
    },
    clearDescription: (state) => {
        state.description = []
    }
  },

})

// Action creators are generated for each case reducer function
export const { setIsChatbox, getIsChatbox, setDescription, clearDescription } = chatboxSlice.actions

export default chatboxSlice.reducer
