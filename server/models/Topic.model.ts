import { getModelForClass, prop } from '@typegoose/typegoose'

class TopicClass {
  @prop({
    type: String,
    unique: true,
    trim: true,
    required: true
  })
  public name: string

  @prop({
    type: String,
    required: false,
    unique: true
  })
  public image?: string
}

const TopicModel = getModelForClass(TopicClass, {
  schemaOptions: {
    timestamps: true,
    versionKey: false
  }
})

export default TopicModel
