import { ChangeEvent, FormEvent, useState } from 'react'
import { NewTopic } from '../../interfaces/topics.interfaces'
import { createNewTopic } from '../../services/topics.api'
import { toast } from 'react-toastify'

function NewTopic() {
  const [newTopic, setNewTopic] = useState<NewTopic>({ name: '', image: null })

  const disabledButton = newTopic.name === ''

  const handleChangeNewTopicName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTopic({ ...newTopic, name: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createNewTopic(newTopic)
      toast.success('Tópico creado con éxito')
    } catch (error) {
      toast.error('Error al crear el tópico')
    }
    setNewTopic({ name: '', image: null })
  }

  return (
    <div className="h-full flex items-start justify-center">
      <div className="bg-gray-800 shadow p-4 rounded-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="topicName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="topicName"
              autoFocus
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
              required
              value={newTopic.name}
              onChange={handleChangeNewTopicName}
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
            />
          </div>
          <button
            type="submit"
            className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={disabledButton}
          >
            Crear Tópico
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewTopic
