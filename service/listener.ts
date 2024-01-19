import { SocketEmitter } from './emitter'
import { IMessage, MESSAGE, ROOM } from './socket-service'

export class SocketListener extends SocketEmitter {
  bindListeners() {
    this.socket.on(ROOM.DELETE, this.roomService.delete)
    this.socket.on(ROOM.CHANGE, roomToken => this.onRoomChange(roomToken))
    this.socket.on(MESSAGE.SEND, (message: IMessage) => {
      console.log(this.socket.id)
      this.socket.to(message.roomToken).emit(MESSAGE.RECIVE, message)
    })
  }

  listenMessageFromAdmin() {
    this.socket.on(MESSAGE.TO_ROOM, async (message: IMessage) => {
      this.onMessageSend(message) // ОТСЫЛАЕМ СООБЩЕНИЕ В КОМНАТУ
    })
  }

  private async onMessageSend(message: IMessage) {
    const msg = await this.roomService.saveMessage(message)
    this.emitMessageToRoom(msg)
  }

  private async onRoomChange(roomToken: string) {
    // await this.roomService.changeRoom(roomToken)
    await this.roomService.findRoom(roomToken) // ИЩЕМ КОМНАТУ В БАЗЕ И ПОДКЛЮЧАЕМСЯ К НЕЙ
    console.log('room: ' + this.roomService.room.token)
    await this.emitMessageListToAdmin()
    this.emitAdminIsConnected()
  }
}
