import {Routes, Route} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisternPage from './pages/RegisterPage'
import ConfirmEmailPage from './pages/ConfirmEmailPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import IndexPage from './pages/IndexPage'
import CreatePage from './pages/CreatePage'
import PostPage from './pages/PostPage'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisternPage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/confirm/email' element={<ConfirmEmailPage />} />
        <Route path='/post/:id' element={<PostPage />} />
      </Routes>
    </UserContextProvider>
  )
}

export default App