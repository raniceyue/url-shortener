import * as controller from './controller'

import Router from 'express'

const cookiesRouter = Router()

cookiesRouter.route('/cookies/:cookie')
  .get(controller.getShorts)

export default cookiesRouter