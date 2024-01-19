import { Schema, model, InferSchemaType } from 'mongoose'

const MessageSchema = new Schema(
  {
    sender: String,
    text: String,
    roomToken: String,
    isRecieved: { type: Boolean, default: false },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
)

MessageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Message = InferSchemaType<typeof MessageSchema>
export const Message = model('Message', MessageSchema)
