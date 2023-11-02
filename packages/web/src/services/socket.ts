import { Socket, io } from 'socket.io-client'

let socket: Socket = {} as Socket

const persist = JSON.parse(localStorage.getItem('persist:root')!)

if (persist) {
  const token = JSON.parse(persist.auth).token

  socket = io('http://localhost:3001', {
    query: { token },
    autoConnect: false,
  })
}
export default socket
