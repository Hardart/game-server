import type { Server, Socket } from 'socket.io'
import type RoomService from './room-service'
import type { Message } from 'models/Message-model'
import { MESSAGE, ROOM, IO, ADMIN } from './socket-service'

export class SocketEmitter {
  protected io: Server
  protected socket: Socket
  protected roomService: RoomService
  protected userToken: string

  protected emitAdminIsConnected() {
    this.socket.to(this.roomService.room.token).emit(ADMIN.CONNECTED, true)
  }

  protected emitMessageToRoom(msg: Message) {
    this.socket.to(msg.roomToken).emit(MESSAGE.RECIVE, msg)
  }

  protected emitUserID() {
    this.socket.emit(IO.USER_ID, this.userToken)
  }

  protected async emitMessageList() {
    this.socket.emit(MESSAGE.LIST, await this.roomService.messageList())
  }

  protected async emitMessageListToAdmin() {
    this.io.emit(ADMIN.MESSAGE_LIST, await this.roomService.messageList())
  }

  protected async emitRoomList() {
    this.socket.emit(ROOM.LIST, await this.roomService.getRoomList())
  }

  protected emitNewRoom() {
    this.io.emit(ROOM.NEW, this.roomService.room)
  }

  private get roomToken() {
    return this.roomService.room.token
  }
}
