import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'
import zod from 'zod'
import { SessionUserService } from '../../services/session-user-service'

export class SessionUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const requestSchema = zod.object({
      email: zod.string().email(),
      password: zod.string(),
    })

    type IInputUser = zod.infer<typeof requestSchema>

    let inputUser: IInputUser = {} as IInputUser

    try {
      inputUser = requestSchema.parse(req.body)
    } catch (err) {
      const errors: string[] = []
      if (err instanceof zod.ZodError) {
        for (const error in err.issues) {
          errors.push(err.issues[error].message)
        }
      }
    }
    try {
      const sessionUserService = await container.resolve(SessionUserService)

      const access_token = await sessionUserService.execute(inputUser)

      res.status(201).send(access_token)
    } catch (error) {
      next(error)
    }
  }
}
