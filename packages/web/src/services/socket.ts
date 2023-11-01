import { Socket, io } from 'socket.io-client'

let socket: Socket | undefined = undefined
// "undefined" means the URL will be computed from the `window.location` object
if (typeof window !== 'undefined') {
  // Perform localStorage action
  const token = localStorage.getItem('access_token')

  socket = io('http://localhost:3001', {
    query: { token },
    autoConnect: false,
  })
}
export default socket
