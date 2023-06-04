import { useParams } from 'react-router-dom'
import useGetTopic from '../../hooks/topics/useGetTopic'
import { Navigate } from 'react-router-dom'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { useState } from 'react'
import { deleteTopicById } from '../../services/topics.api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function TopicDetail() {
  const { topicId } = useParams()
  if (!topicId) return <Navigate to="/" />

  const [showModal, setShowModal] = useState<boolean>(false)
  const [deleting, setDeleting] = useState<boolean>(false)
  const navigate = useNavigate()

  const { error, isLoading, topic } = useGetTopic({ topicId })

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
    <div>
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
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={openModal}
          >
            Eliminar Tópico
          </button>
        </div>
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
