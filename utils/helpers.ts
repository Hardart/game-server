import { RoomService, AdminService } from '../service/room-service'
import { ADMIN, IMessage } from '../service/socket-service'
import { Server, Socket } from 'socket.io'
const roomService = new RoomService()
const adminService = new AdminService()

async function onMessageSend(message: IMessage) {
  if (isAdmin(this)) {
    io.to(message.roomToken).emit('message:recive', message)
    roomService.room.token = message.roomToken
  } else {
    io.emit('message:to_admin', message)
  }

  await roomService.saveMessage(message)
}

function isAdmin(socket: Socket) {
  return socket.handshake.auth.isAdmin
}

async function onRoomChange(roomToken: string) {
  this.emit(ADMIN.MESSAGE_LIST, await roomService.messageList(roomToken))
}
