import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { IJWTProvider } from './models/IJWTProvider'
import authSettings from '../../config/auth'

export class JWTProvider implements IJWTProvider {
  public secret: string
  public expiresIn: string

  constructor() {
    this.secret = authSettings.jwt.secret
    this.expiresIn = authSettings.jwt.expiresIn
  }

  async sign(userId: string): Promise<string> {
    const token = await sign({}, this.secret, { subject: String(userId), expiresIn: this.expiresIn })

    return token
  }
  async verify(token: string): Promise<JwtPayload | string> {
    const resultToken = await verify(token, this.secret)

    return resultToken
  }
}
