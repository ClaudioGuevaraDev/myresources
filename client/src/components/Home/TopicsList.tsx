import useGetTopics from '../../hooks/useGetTopics'

function TopicsList() {
  const { topics } = useGetTopics()

  return (
    <div className="grid grid-cols-6 gap-6">
      {topics?.map(topic => (
        <div
          key={topic._id}
          className="bg-gray-800 p-3 rounded-lg cursor-pointer flex items-center justify-around shadow hover:scale-110 transition duration-300"
        >
          <img
            src={topic.image ? topic.image : '/imgs/no_image.png'}
            alt={topic.name}
          />
          <div className="h-full flex flex-col justify-between">
            <span className="font-semibold text-lg">{topic.name}</span>
            <span className="font-normal text-base">10 recursos</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TopicsList
