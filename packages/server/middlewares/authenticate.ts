import { JWTProvider } from '../providers/JWTProvider/JWTProvider'
import { NextFunction, Request, Response } from 'express'
const jwtProvider = new JWTProvider()

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers

  if (authorization) {
    const access_token = authorization.split(' ')[1]
    try {
      const token = await jwtProvider.verify(access_token)

      req.userId = token.sub as string
      next()
    } catch (err) {
      console.log(err)
      next(err)
    }
  } else {
    next(new Error('Token not provided'))
  }
}
