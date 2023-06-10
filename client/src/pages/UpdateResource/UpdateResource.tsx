import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { NewResource } from '../../interfaces/resources.interfaces'
import LoadingPurpleButton from '../../components/LoadingPurpleButton/LoadingPurpleButton'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useGetResource from '../../hooks/resources/useGetResource'
import {
  deleteResource,
  editResource,
  updateResourceImageById,
} from '../../services/resource.api'
import { toast } from 'react-toastify'
import LoadingErrorButton from '../../components/LoadingErrorButton/LoadingErrorButton'

function UpdateResource() {
  const { resourceId } = useParams()
  if (!resourceId) return <Navigate to="/" />

  const { error, isLoading, resource } = useGetResource({ resourceId })

  const navigate = useNavigate()

  const [updatedResource, setUpdatedResource] = useState<NewResource>({
    image: null,
    link: '',
    name: '',
    rating: 1,
  })
  const [updateLoading, setUpdateLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  const resouceImageRef = useRef<HTMLInputElement>(null)

  const disabledButton =
    updatedResource.name === '' ||
    updatedResource.link === '' ||
    updatedResource.rating < 1 ||
    updatedResource.rating > 5

  const handleChangeResourceName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedResource({ ...updatedResource, name: e.target.value })
  }
  const handleChangeResourceLink = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedResource({ ...updatedResource, link: e.target.value })
  }
  const handleChangeResourceImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setUpdatedResource({ ...updatedResource, image: e.target.files[0] })
    }
  }
  const handleChangeResourceRating = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedResource({ ...updatedResource, rating: parseInt(e.target.value) })
  }

  const updateResource = async () => {
    setUpdateLoading(true)

    try {
      await editResource(updatedResource, resourceId)

      if (updatedResource.image) {
        const formData = new FormData()
        formData.append('file', updatedResource.image)
        await updateResourceImageById(resourceId, formData)
      }

      toast.success('Recurso editado con éxito')
    } catch (error) {
      toast.error('Error al editar el recurso')
    }

    setUpdateLoading(false)
  }

  const removeResource = async () => {
    setDeleteLoading(true)
    try {
      await deleteResource(resourceId)
      toast.success('Recurso eliminado con éxito')
      setDeleteLoading(false)
      navigate(`/topic/${resource?.topic}`)
    } catch (error) {
      toast.error('Error al eliminar el recurso')
      setDeleteLoading(false)
    }
  }

  useEffect(() => {
    if (resource) {
      setUpdatedResource({
        name: resource.name,
        link: resource.link,
        rating: resource.rating,
        image: null,
      })
    }
  }, [resource])

  if (isLoading) return null
  else if (error || !resource) return null

  return (
    <div className="h-full flex items-start justify-center">
      <div className="bg-gray-800 shadow p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="resourceName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="resourceName"
              autoFocus
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
              value={updatedResource.name}
              onChange={handleChangeResourceName}
            />
          </div>
          <div>
            <label
              htmlFor="resourceLink"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Link
            </label>
            <input
              type="text"
              id="resourceLink"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
              value={updatedResource.link}
              onChange={handleChangeResourceLink}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="topicFile"
            >
              Imagen
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="topicFile"
              type="file"
              required={false}
              ref={resouceImageRef}
              onChange={handleChangeResourceImage}
            />
          </div>
          <div>
            <label
              htmlFor="resourceRating"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Puntaje
            </label>
            <input
              type="number"
              id="resourceRating"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required={true}
              min={1}
              max={5}
              value={updatedResource.rating}
              onChange={handleChangeResourceRating}
            />
          </div>

          {updateLoading ? (
            <LoadingPurpleButton />
          ) : (
            <button
              type="button"
              className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={disabledButton}
              onClick={updateResource}
            >
              Editar Recurso
            </button>
          )}

          {deleteLoading ? (
            <LoadingErrorButton />
          ) : (
            <button
              type="button"
              className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={removeResource}
            >
              Eliminar Recurso
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateResource
