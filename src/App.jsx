import { useEffect, useState } from 'react'
import { Header, Footer } from './components/index'
import { useDispatch } from 'react-redux'
import { authService } from './appwrite/auth'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }, [])

  return (
    <div className={`h-screen w-screen bg-gray-200 dark:bg-gray-900`}>
      <Header />
      <h6 className="text-3xl text-gray-500">react-post</h6>
      <Footer />
    </div>
  )
}

export default App
