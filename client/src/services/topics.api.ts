import axios from 'axios'
import { NewTopic, Topic } from '../interfaces/topics.interfaces'

const topcisApi = axios.create({ baseURL: '/api/topics' })

export const getTopics = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const getTopicById = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const createNewTopic = async (newTopic: NewTopic) => {
  const response = await topcisApi.post('/', newTopic)
  return response.data as Topic
}

export const deleteTopicById = async (topicId: string) => {
  await topcisApi.delete(`/${topicId}`)
}

export const updateTopicImageById = async (
  topicId: string,
  formData: FormData
) => {
  await topcisApi.patch(`/edit-image/${topicId}`, formData)
}
