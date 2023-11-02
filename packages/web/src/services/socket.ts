import { Socket, io } from 'socket.io-client'

let socket: Socket = {} as Socket

const persist = JSON.parse(localStorage.getItem('persist:root')!)

if (persist) {
  const token = JSON.parse(persist.auth).token

  socket = io('https://webchat-2mad.onrender.com', {
    query: { token },
    autoConnect: false,
  })
}
export default socket
