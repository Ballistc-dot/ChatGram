import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './input.css'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import Chat from './pages/chat.tsx'
import Login from './pages/login.tsx'
import { store } from './store'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
    loader: async () => {
      const isAuth = store.getState().auth.token
      if (!isAuth) {
        return redirect('/login')
      }
      return null
    },
  },
  {
    path: '/login',
    element: <Login />,
    loader: async () => {
      const isAuth = store.getState().auth.token
      if (isAuth) {
        return redirect('/')
      }
      return null
    },
  },
])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
