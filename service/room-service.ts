import { Room } from '../models/Room-model'
import { Message } from '../models/Message-model'
import { IMessage, MESSAGE, ROOM } from './socket-service'

export class AdminService {
  adminToken: string
  room: Room

  async findRoom(token: string) {
    this.room = await Room.findOne({ token })
  }

  async getRoomList() {
    return await Room.find().select('token')
  }

  async delete(token: string) {
    await Room.findOneAndDelete({ token })
    await Message.deleteMany({ roomToken: token })
  }
}

export class RoomService {
  room: Room

  async init(token: string) {
    const room = { token }
    this.room = await Room.findOneAndUpdate(room, room, { upsert: true, new: true })
  }

  async messageList(roomToken: string) {
    return await Message.find({ roomToken }).select(['text', 'sender', 'createdAt'])
  }

  async saveMessage({ text, sender, roomToken }: IMessage) {
    const message = new Message({
      text,
      sender,
      roomToken,
    })
    await message.save()
    return message
  }
}
