import { Socket, io } from 'socket.io-client'

const persist = JSON.parse(localStorage.getItem('persist:root')!)

let token: string
let socket: Socket = {} as Socket

if (persist) {
  token = JSON.parse(persist?.auth)?.token
  if (token) {
    socket = io(import.meta.env.BASE_URL, {
      query: { token },
      autoConnect: false,
    })
  }
}
export default socket
