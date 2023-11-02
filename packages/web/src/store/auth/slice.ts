'use client'
import { createSlice } from '@reduxjs/toolkit'
import { authInitialState } from './initialState'
import { signInWithEmailAndPassword } from './thunks'

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    signOut: (state) => {
      state.isAuth = false
      state.token = ''
    },
  },
  extraReducers: (builder) => {
    //builder.addCase(signInWithGoogle.pending, (state) => {}),
    builder.addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
      // const teste = action.meta.arg.idToken
      state.isAuth = true
      state.token = action.payload.access_token
    })
  },
})

// Action creators are generated for each case reducer function
export const { signOut } = authSlice.actions

export const isAuth = (state: any) => state.auth.isAuth

export default authSlice.reducer
