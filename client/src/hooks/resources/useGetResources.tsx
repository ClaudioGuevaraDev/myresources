import useSWR from 'swr'
import { getResources } from '../../services/resource.api'
import { Resource } from '../../interfaces/resources.interfaces'

function useGetResources() {
  const {
    data: resources,
    isLoading,
    error,
  } = useSWR<Resource[]>('/api/resources', getResources)

  return { resources, isLoading, error }
}

export default useGetResources
