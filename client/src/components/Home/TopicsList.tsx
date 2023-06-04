import useGetTopics from '../../hooks/topics/useGetTopics'

import { useNavigate } from 'react-router-dom'

function TopicsList() {
  const { topics, isLoading, error } = useGetTopics()

  const navigate = useNavigate()

  if (error || !topics) return null

  return (
    <div className="grid grid-cols-6 gap-6">
      {topics.map(topic => (
        <div key={topic._id}>
          {isLoading ? (
            <div className="bg-gray-700 p-3 rounded-lg animate-pulse h-20"></div>
          ) : (
            <div
              className="bg-gray-800 p-3 rounded-lg cursor-pointer flex items-center justify-around shadow hover:scale-110 transition duration-300"
              onClick={() => navigate(`/topic/${topic._id}`)}
            >
              <img
                src={topic.image ? topic.image : '/imgs/no_image.png'}
                alt={topic.name}
              />
              <div className="h-full flex flex-col justify-between">
                <span className="font-semibold text-lg">{topic.name}</span>
                <span className="font-normal text-base">
                  {topic.resources.length} recursos
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default TopicsList
