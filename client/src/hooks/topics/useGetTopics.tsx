import useSWR from 'swr'
import { Topic } from '../../interfaces/topics.interfaces'
import { getTopics } from '../../services/topics.api'

function useGetTopics() {
  const {
    data: topics,
    isLoading,
    error,
  } = useSWR<Topic[]>('/api/topics', getTopics)

  return { topics, isLoading, error }
}

export default useGetTopics
