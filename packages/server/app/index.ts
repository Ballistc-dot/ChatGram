import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import http from 'node:http'
import '../repositories/index'
import '../providers/index'
import jwt from 'jsonwebtoken'
import jwtConfig from '../config/auth'
import routes from './routes'
import { Server, Socket } from 'socket.io'
import { delRedis, setRedis } from '../lib/redis'
import cors from 'cors'
import { SendMessageController } from '../infra/ws/send-message-controller'
const app = express()

app.use(express.json())

const server = http.createServer(app)

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
app.use(cors())

const sendMessageController = new SendMessageController()

io.on('connection', (socket: Socket) => {
  try {
    const user = jwt.verify(socket.handshake.query.token as string, jwtConfig.jwt.secret)

    if (!user) socket.emit('unauthorized, you must provide a valid token')
    setRedis(`socketId/user-id:${user.sub as string}`, socket.id)
    socket.on('disconnect', () => {
      console.log('disconnected')
      //const user = jwt.verify(socket.handshake.query.token as string, jwtConfig.jwt.secret)
      delRedis(`socketId/user-id:${user.sub as string}`, '')
    })
    socket.on('message', (content) => sendMessageController.handle(content, user))

    socket.on('client-ready', () => {
      socket.broadcast.emit('get-canvas-state')
    })
  } catch (err) {
    socket.emit('error', { error: 'invalid token' })
  }
})

app.use(routes)

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  })
})
server.listen(3001, () => {
  console.log('✔️ Server listening on port 3001')
})
