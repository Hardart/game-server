import { Schema, model, InferSchemaType } from 'mongoose'

const RoomSchema = new Schema({
  token: { type: String, required: true },
})

RoomSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Room = InferSchemaType<typeof RoomSchema>
export const Room = model('Room', RoomSchema)
