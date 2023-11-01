import { JwtPayload } from 'jsonwebtoken'

export interface IJWTProvider {
  sign(userId: string): Promise<string>
  verify(token: string): Promise<JwtPayload | string>
}
