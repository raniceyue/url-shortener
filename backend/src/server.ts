// import cookieParser from "cookie-parser"
import express from 'express'
import BaseRouter from '@api/routes'
// import compression from 'compression'

const app = express()

/**
 * API endpoints
 */
app.get('/', (req: any, res: any) => {
  res.status(200).send('This is the backend API for the URL shortener!')
})

app.use('/api', BaseRouter)

/**
 * API endpoint for shortcode resolution
 */
app.get('/:short', (req: any, res: any) => {
  res.status(200)
    .send(req.params.short)
})

export default app