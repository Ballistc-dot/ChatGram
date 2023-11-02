import { createAsyncThunk } from '@reduxjs/toolkit'
import { ISignInWithEmailAndPasswordPayload } from './interfaces/ISignInPayload'
import { api } from '../../services/axios'

export const signInWithEmailAndPassword = createAsyncThunk(
  'auth/signInWithEmailAndPassword',
  async ({ email, password }: ISignInWithEmailAndPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await api.post('/session', {
        email,
        password,
      })
      const { access_token } = response.data

      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`

      return {
        access_token,
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message)
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

    //return rejectWithValue('awds')*/
  }
)
