import express from 'express'
// import compression from 'compression'

const app = express()
const PORT = 8080

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT)
})

app.get('/', (req: any, res: any) => {
  res.send('Hello!')
})