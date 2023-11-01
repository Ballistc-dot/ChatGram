import { container } from 'tsyringe'
import { CreateUserService } from '../../services/create-user-service'
import { NextFunction, Request, Response } from 'express'
import zod from 'zod'

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const requestSchema = zod.object({
      username: zod.string(),
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

        res.status(409).send(errors)
      }
    }
    try {
      const createUserService = await container.resolve(CreateUserService)

      const access_token = await createUserService.execute(inputUser)

      res.status(201).send(access_token)
    } catch (error: any) {
      error.statusCode = 403
      next(error)
    }
  }
}
