import { useParams } from 'react-router-dom'
import useGetTopic from '../../hooks/topics/useGetTopic'
import { Navigate } from 'react-router-dom'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { useState } from 'react'
import { deleteTopicById } from '../../services/topics.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useGetResources from '../../hooks/resources/useGetResources'

function TopicDetail() {
  const { topicId } = useParams()
  if (!topicId) return <Navigate to="/" />

  const [showModal, setShowModal] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const navigate = useNavigate()

  const { error, isLoading, topic } = useGetTopic({ topicId })
  const { resources } = useGetResources()

  if (isLoading) return <></>
  else if (error || !topic) return <Navigate to="/" />

  const openModal = () => {
    setShowModal(true)
  }
  const closeModal = () => {
    setShowModal(false)
  }

  const deleteTopic = async () => {
    setDeleting(true)
    try {
      await deleteTopicById(topic._id)
      setDeleting(false)
      toast.success('Tópico eliminado con éxito')
      closeModal()
      navigate('/')
    } catch (error) {
      setDeleting(true)
      toast.error('Error al eliminar el tópico')
      closeModal()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-4">
          <img
            src={topic.image ? topic.image : '/assets/no_image.png'}
            alt={topic.name}
            className="w-14 h-14"
          />
          <h3 className="text-3xl font-bold">{topic.name}</h3>
        </div>
        <div>
          <button
            type="button"
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
            onClick={() => {
              navigate(`/new-resource/${topic._id}`)
            }}
          >
            Añadir Recurso
          </button>

          <button
            type="button"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={openModal}
          >
            Eliminar Tópico
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {resources?.map(resource => (
          <div
            key={resource._id}
            className="bg-gray-800 py-3 rounded-lg flex items-center justify-around shadow cursor-default"
          >
            <img
              src={resource.image ? resource.image : '/assets/no_image.png'}
              alt={resource.name}
              className="w-12 h-12"
            />
            <div className="h-full flex flex-col justify-between">
              <div className="font-semibold text-lg flex items-center justify-between gap-2">
                <span>{resource.name}</span>
                <a
                  href={resource.link}
                  className="hover:cursor-pointer"
                  target="_blank"
                >
                  <svg
                    width={20}
                    height={20}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                </a>
              </div>
              <div className="flex items-center">
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    resource.rating >= 1 ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    resource.rating >= 2 ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    resource.rating >= 3 ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    resource.rating >= 4 ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  aria-hidden="true"
                  className={`w-5 h-5 ${
                    resource.rating >= 5 ? 'text-yellow-400' : 'text-gray-500'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        message="¿Estás seguro de eliminar el tópico? Todos los recursos asociados a ese tópico también serán eliminados"
        handleClick={deleteTopic}
        loading={deleting}
      />
    </div>
  )
}

export default TopicDetail
