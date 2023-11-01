import { combineReducers } from '@reduxjs/toolkit'
import AuthReducer from './auth/slice'

import ChatReducer from './chat/slice'

export const rootReducer = combineReducers({ auth: AuthReducer, chat: ChatReducer })
