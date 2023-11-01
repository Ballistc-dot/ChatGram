import express from 'express'
import sessionRouter from './session.routes'
import { SearchPeopleController } from '../infra/http/search-people-controller'
import { authenticate } from '../middlewares/authenticate'

const router = express.Router()

const searchPeopleController = new SearchPeopleController()
//router.use()
router.get('/test', authenticate, (req, res) => {
  res.send(req.userId)
})

router.get('/people?:username', searchPeopleController.handle)
router.use(sessionRouter)

export default router
