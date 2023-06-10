import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import LoadingPurpleButton from '../../components/LoadingPurpleButton/LoadingPurpleButton'
import { NewResource } from '../../interfaces/resources.interfaces'
import { Navigate, useParams } from 'react-router-dom'
import { createResource } from '../../services/resource.api'
import { toast } from 'react-toastify'

function NewResource() {
  const { topicId } = useParams()
  if (!topicId) return <Navigate to="/" />
  const [newResource, setNewResource] = useState<NewResource>({
    image: null,
    link: '',
    name: '',
    rating: 1,
  })
  const [loading, setLoading] = useState<boolean>(false)

  const disabledButton =
    newResource.name === '' ||
    newResource.link === '' ||
    newResource.rating < 1 ||
    newResource.rating > 5

  const resouceImageRef = useRef<HTMLInputElement>(null)

  const handleChangeResourceName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewResource({ ...newResource, name: e.target.value })
  }
  const handleChangeResourceLink = (e: ChangeEvent<HTMLInputElement>) => {
    setNewResource({ ...newResource, link: e.target.value })
  }
  const handleChangeResourceImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setNewResource({ ...newResource, image: e.target.files[0] })
    }
  }
  const handleChangeResourceRating = (e: ChangeEvent<HTMLInputElement>) => {
    setNewResource({ ...newResource, rating: parseInt(e.target.value) })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()

    try {
      await createResource(newResource, topicId)
      toast.success('Recurso añadido con éxito')
    } catch (error) {
      toast.error('Error al crear el recurso')
    }
    setNewResource({
      image: null,
      link: '',
      name: '',
      rating: 1,
    })
    setLoading(false)
  }

  return (
    <div className="h-full flex items-start justify-center">
      <div className="bg-gray-800 shadow p-4 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={newResource.name}
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
              value={newResource.link}
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
              value={newResource.rating}
              onChange={handleChangeResourceRating}
            />
          </div>

          {loading ? (
            <LoadingPurpleButton />
          ) : (
            <button
              type="submit"
              className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={disabledButton}
            >
              Añadir Recurso
            </button>
          )}
        </form>
      </div>
    </div>
  )
}

export default NewResource
