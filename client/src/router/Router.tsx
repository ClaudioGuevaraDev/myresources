import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import TopicDetail from '../pages/TopicDetail/TopicDetail'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topicId" element={<TopicDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
