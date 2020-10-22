const express = require('express')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

const port = process.env.PORT || 8080
const app = express()

//To integrate socket.io with our server
const server = http.createServer(app)

//Access socket.io library
let io = socketIO(server)

//Set static folder
// app.use(express.static(__dirname))
// app.use(express.static(path.join(__dirname, 'build')))

//Enter Heroku - app routes through url
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

//Start server
server.listen(port, () => {
  console.log(`Listening at port ${port}`)
})
