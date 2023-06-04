import { model, Schema } from 'mongoose'

const topicSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  image: { type: String, required: false },
  resources: [{ type: Schema.Types.ObjectId, ref: 'Resource' }]
}, { timestamps: true, versionKey: false })

export const TopicModel = model('Topic', topicSchema)
