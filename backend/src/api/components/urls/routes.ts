import * as controller from "./controller"
import Router from 'express'

const urlsRouter = Router()

urlsRouter.route('/')
  .get((req: any, res: any) => {
    res.send('fart')
  })
  .post(controller.createShort)

urlsRouter.route('/:long_url')
  .get(controller.generateShortcode)

// urlsRouter.route('/:short_url')
//   .delete(controller.deleteShort)

export default urlsRouter