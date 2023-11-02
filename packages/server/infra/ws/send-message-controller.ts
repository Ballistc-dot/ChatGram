import { JwtPayload } from 'jsonwebtoken'
import { io } from '../../app'
import { getRedis } from '../../lib/redis'
import { container } from 'tsyringe'
import { SendMessageService } from '../../services/send-message-service'

export class SendMessageController {
  async handle(content: any, userPayload: JwtPayload | string) {
    const socketId = (await getRedis(`socketId/user-id:${content.userId as string}`)) as unknown as string

    const sendMessageService = container.resolve(SendMessageService)

    const user = await sendMessageService.execute(userPayload.sub as string)

    io.to(socketId).emit('message', { message: content.message, user })
  }
}
