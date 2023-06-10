import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import TopicDetail from '../pages/TopicDetail/TopicDetail'
import NewTopic from '../pages/NewTopic/NewTopic'
import NewResource from '../pages/NewResource/NewResource'
import UpdateResource from '../pages/UpdateResource/UpdateResource'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topicId" element={<TopicDetail />} />
        <Route path="/new-topic" element={<NewTopic />} />
        <Route path="/new-resource/:topicId" element={<NewResource />} />
        <Route path="/edit-resource/:resourceId" element={<UpdateResource />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
