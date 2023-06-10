import useSWR from 'swr'
import { Resource } from '../../interfaces/resources.interfaces'
import { getResourceById } from '../../services/resource.api'

interface Props {
  resourceId: string
}

function useGetResource({ resourceId }: Props) {
  const {
    data: resource,
    isLoading,
    error,
  } = useSWR<Resource>(`/api/resources/${resourceId}`, getResourceById)

  return { resource, isLoading, error }
}

export default useGetResource
