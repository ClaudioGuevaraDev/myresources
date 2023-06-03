import axios from 'axios'

export const getTopics = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const getTopicById = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}
