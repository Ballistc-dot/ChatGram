import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatInitialState } from './initialState'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    updateActiveChat: (
      state,
      action: PayloadAction<{
        activeChat: {
          username: string
          id: string
        }
      }>
    ) => {
      state.activeChat = action.payload.activeChat
    },
  },
  extraReducers: () => {
    //builder.addCase(signInWithGoogle.pending, (state) => {}),
  },
})

// Action creators are generated for each case reducer function
export const { updateActiveChat } = chatSlice.actions

export const isAuth = (state: any) => state.auth.isAuth

export default chatSlice.reducer
