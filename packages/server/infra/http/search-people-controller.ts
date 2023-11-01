import { container } from 'tsyringe'
import { NextFunction, Request, Response } from 'express'
import zod from 'zod'
import { SearchPeopleService } from '../../services/search-people-service'

export class SearchPeopleController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const requestSchema = zod.object({
      username: zod.string(),
    })

    type IInputUser = zod.infer<typeof requestSchema>

    let inputUser: IInputUser = {} as IInputUser

    try {
      inputUser = requestSchema.parse(req.query)
    } catch (err) {
      const errors: string[] = []
      if (err instanceof zod.ZodError) {
        for (const error in err.issues) {
          errors.push(err.issues[error].message)
        }
      }
    }
    try {
      const searchPeopleService = await container.resolve(SearchPeopleService)

      const users = await searchPeopleService.execute(inputUser.username)

      res.status(200).send(users)
    } catch (error) {
      next(error)
    }
  }
}
