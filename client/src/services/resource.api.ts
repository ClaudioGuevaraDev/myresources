import axios from 'axios'
import { NewResource } from '../interfaces/resources.interfaces'

const resourcesApi = axios.create({ baseURL: '/api/resources' })

export const getResources = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const createResource = async (
  newResource: NewResource,
  topicId: string
) => {
  const body = { ...newResource, topicId }
  await resourcesApi.post('/', body)
}
