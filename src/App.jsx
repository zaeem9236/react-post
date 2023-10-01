import { useEffect, useState } from 'react'
import { Header, Footer } from './components/index'
import { useDispatch } from 'react-redux'
import { authService } from './appwrite/auth'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        console.log(data)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={`h-screen w-screen bg-gray-200 dark:bg-gray-900`}>
      <Header />
      {loading ? <h1 className='text-4xl text-red-600'>Loading</h1> : <h6 className="text-3xl text-white">react-post</h6>}
      <Footer />
    </div>
  )
}

export default App
