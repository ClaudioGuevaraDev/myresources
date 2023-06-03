import useSWR from 'swr'
import { Topic } from '../interfaces/topics.interfaces'
import { getTopicById } from '../services/topics.api'

interface Props {
  topicId: string
}

function useGetTopic({ topicId }: Props) {
  const {
    data: topic,
    isLoading,
    error,
  } = useSWR<Topic>(`/api/topics/${topicId}`, getTopicById)

  return { topic, isLoading, error }
}

export default useGetTopic
