import express from 'express'
import { CreateUserController } from '../infra/http/create-user-controller'
import { SessionUserController } from '../infra/http/session-user-controller'

const sessionRouter = express.Router()
const createUserController = new CreateUserController()
const sessionUserController = new SessionUserController()

sessionRouter.put('/session', createUserController.handle)
sessionRouter.post('/session', sessionUserController.handle)

export default sessionRouter
