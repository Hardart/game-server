export interface IMessage {
  text: string
  sender: string
  roomToken: string
}
export enum IO {
  CONNECTION = 'connection',
  USER_ID = 'user_id',
}

export enum ROOM {
  LIST = 'room:list',
  NEW = 'room:new',
  DELETE = 'room:delete',
  CHANGE = 'room:change',
  NEW_MESSAGE = 'room:new_message',
}

export enum ADMIN {
  MESSAGE_LIST = 'admin:message_list',
  CONNECTED = 'admin:connected',
}

export enum MESSAGE {
  SEND = 'message:send',
  RECIVE = 'message:recive',
  LIST = 'message:list',
  TO_ROOM = 'message:to_room',
}
