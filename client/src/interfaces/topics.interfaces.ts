export interface Topic {
  _id: string
  name: string
  image?: string
  createdAt: string
  updatedAt: string
  resources: string[]
}

export interface NewTopic {
  name: string
  image: File | null
}
