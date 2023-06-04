import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false
  }
})
class Resource {
  @prop({
    type: String,
    required: true,
    unique: true,
    trim: false
  })
  public name: string

  @prop({
    type: String,
    required: true
  })
  public link: string

  @prop({
    type: String,
    required: false
  })
  public image?: string

  @prop({
    type: Number,
    required: false,
    default: 0
  })
  public rating: number

  @prop({
    type: String,
    required: true
  })
  public topic: string
}

const ResourceModel = getModelForClass(Resource)

export { ResourceModel }
