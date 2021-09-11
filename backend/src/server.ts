// import cookieParser from "cookie-parser"
import * as dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import BaseRouter from '@api/routes'
import cors from 'cors'

import { IUrl, Url } from '@components/urls/model'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/**
 * Connect tp db
 */
mongoose.connect(process.env.DB_URI!)
  .then(() => console.log('Successfully connected to db'))
  .catch((e) => console.error('Failed to connect to db:\n' + e))

/**
 * API routes
 */

app.get('/', (req: any, res: any) => {
  res.status(200).send('This is the backend API for the URL shortener!')
})

app.use('/api', BaseRouter)

// Redirect short links
app.get('/:short', (req: any, res: any) => {
  getLong(req.params.short)
    .then(long => { res.status(200).redirect(long) })
    .catch(e => {
      res.status(404).send('Unable to find link: ' + e)
    })
})

/**
 * Function to look through and get the long URL from the provided hash (short link)
 * @param short - Hash of the link
 * @returns Long URL of the hash provided
 */
async function getLong(short: string) {
  let doc : IUrl = await Url.findOne({ short: short })
  return doc.long
}

export default app