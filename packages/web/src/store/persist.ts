import { persistReducer } from 'redux-persist'
import { rootReducer } from './reducer'
import storage2 from 'redux-persist/lib/storage'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null)
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: any) {
      return Promise.resolve()
    },
  }
}
const storage = typeof window !== 'undefined' ? storage2 : createNoopStorage()

const persistConfig = {
  key: 'root',
  storage: storage,
}

export const persistedReducer = persistReducer(persistConfig, rootReducer)
