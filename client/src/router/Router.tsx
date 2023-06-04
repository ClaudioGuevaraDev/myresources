import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import TopicDetail from '../pages/TopicDetail/TopicDetail'
import NewTopic from '../pages/NewTopic/NewTopic'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topicId" element={<TopicDetail />} />
        <Route path="/new-topic" element={<NewTopic />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
