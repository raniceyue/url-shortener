import app from "./server"

const port = Number(process.env.PORT || 9000)

app.listen(port, () => {
  console.log('Server is listening to http://localhost:' + port)
})