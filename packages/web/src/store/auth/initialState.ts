import { AuthState } from './interfaces/IAuthState'

export const authInitialState: AuthState = {
  isAuth: false,
  token: '',
  refresh_token: '',
}
