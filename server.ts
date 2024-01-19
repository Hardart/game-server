import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
const PORT = process.env.PORT || 3070
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: { allowedHeaders: '*' },
})
// const socket = new SocketService(app)

async function startServer() {
  // const DB_URI = 'mongodb+srv://kaino:vUAwVSoyJgWNUlEj@cluster0.6wswz.mongodb.net/socket-chat'
  // if (!DB_URI) return console.log('NO MONGO_DB URL')

  try {
    // await mongoose.connect(DB_URI)
    // console.log('====================================\nБД подключена\n====================================')
    httpServer.listen(PORT, () => {
      console.log(`\n====================================\nСервер запущен, порт: ${PORT}\n====================================`)
    })
    // socket.listenPort(PORT)
  } catch (error) {
    console.log(error)
  }
}

startServer()

io.on('connection', onConnection)

function onConnection(socket: Socket) {
  socket.on('player1', data => {
    socket.broadcast.emit('p1', data)
  })
  socket.on('player2', data => {
    socket.broadcast.emit('p2', data)
  })
  socket.on('player3', data => {
    socket.broadcast.emit('p3', data)
  })
}
