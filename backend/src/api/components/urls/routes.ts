import * as controller from "./controller"
import Router from 'express'

const urlsRouter = Router()

urlsRouter.route('/')
  .get((req: any, res: any) => {
    res.status(200)
      .send('This is the endpoint for creating new short links')
  })
  .post(controller.createShort)

urlsRouter.route('/:short')
  .get(controller.getLong)

export default urlsRouter