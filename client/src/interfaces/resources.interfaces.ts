export interface Resource {
  _id: string
  name: string
  link: string
  image?: string
  topic: string
  rating: number
  createdAt: string
  updatedAt: string
}

export interface NewResource {
  name: string
  link: string
  image: File | null
  rating: number
}
