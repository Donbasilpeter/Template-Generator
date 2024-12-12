import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sessionList: [],
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.sessionList = action.payload
    },
  },

})

// Action creators are generated for each case reducer function
export const { setSession } = sessionSlice.actions

export default sessionSlice.reducer