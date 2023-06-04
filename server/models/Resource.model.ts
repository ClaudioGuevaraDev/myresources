import { model, Schema } from 'mongoose'

const resourceSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  link: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: Number, default: 0 },
  topic: { type: Schema.Types.ObjectId, ref: 'Topic' }
}, { timestamps: true, versionKey: false })

export const ResourceModel = model('Resource', resourceSchema)
