import { io } from 'socket.io-client'

const persist = JSON.parse(localStorage.getItem('persist:root')!)
let token: string
let socket: any
if (persist) {
  token = JSON.parse(persist?.auth)?.token
  if (token) {
    socket = io(
      'https://webchat-2mad.onrender.com',
      /*'http://localhost:3001'*/ {
        query: { token: token! },
        autoConnect: false,
      }
    )
  }
}
export default socket
