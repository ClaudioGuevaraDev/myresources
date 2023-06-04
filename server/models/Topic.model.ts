import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({

  schemaOptions: {
    timestamps: true,
    versionKey: false
  }
})
class Topic {
  @prop({
    type: String,
    unique: true,
    trim: true,
    required: true
  })
  public name: string

  @prop({
    type: String,
    required: false
  })
  public image?: string

  @prop({
    type: () => [String],
    default: []
  })
  public resources: string[]
}

const TopicModel = getModelForClass(Topic)

export { TopicModel }
