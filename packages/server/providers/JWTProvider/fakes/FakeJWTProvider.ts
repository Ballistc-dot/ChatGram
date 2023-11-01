import { JwtPayload } from 'jsonwebtoken'
import { IJWTProvider } from '../models/IJWTProvider'

export class FakeJWTProvider implements IJWTProvider {
  async sign(userId: string): Promise<string> {
    return userId
  }
  async verify(token: string): Promise<string | JwtPayload> {
    return token
  }
}
