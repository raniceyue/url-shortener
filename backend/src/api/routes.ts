import Router from 'express'

import urlsRouter from '@components/urls/routes'
import cookiesRouter from "@components/cookies/routes"

const router = Router()

router.use('/urls', urlsRouter)
router.use('/cookies', cookiesRouter)

export default router