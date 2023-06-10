import axios from 'axios'
import { NewResource, Resource } from '../interfaces/resources.interfaces'

const resourcesApi = axios.create({ baseURL: '/api/resources' })

export const getResources = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const getResourceById = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const createResource = async (
  newResource: NewResource,
  topicId: string
) => {
  const body = { ...newResource, topicId }
  const response = await resourcesApi.post('/', body)
  return response.data as Resource
}

export const updateResourceImageById = async (
  topicId: string,
  formData: FormData
) => {
  await resourcesApi.patch(`/edit-image/${topicId}`, formData)
}

export const editResource = async (
  resource: NewResource,
  resourceId: string
) => {
  const body = {
    name: resource.name,
    link: resource.link,
    rating: resource.rating,
  }
  await resourcesApi.put(`/${resourceId}`, body)
}

export const deleteResource = async (resourceId: string) => {
  await resourcesApi.delete(`/${resourceId}`)
}
