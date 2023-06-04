import Router from './router/Router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="bg-gray-900 text-white h-screen dark">
      <div className="h-full container mx-auto p-6">
        <Router />
      </div>

      <ToastContainer theme="dark" />
    </div>
  )
}

export default App
