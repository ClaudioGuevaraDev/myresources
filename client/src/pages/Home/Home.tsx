import TopicsList from '../../components/Home/TopicsList'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
        onClick={() => navigate('/new-topic')}
      >
        Nuevo Tópico
      </button>

      <TopicsList />
    </div>
  )
}

export default Home
