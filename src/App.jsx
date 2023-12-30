import { useEffect, useState } from 'react'
import { Header, Footer, Button, InputField } from './components/index'
import { useDispatch } from 'react-redux'
import { login } from './redux/slices/authSlice'
import { authService } from './appwrite/auth'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((data) => {
        setLoading(false)
        dispatch(login(data))
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={`h-screen w-screen bg-gray-200 dark:bg-gray-900`}>
      <Header />
      {/* temp button to login */}
      <Button  onClick={() => authService.login({email: 'abc@abc.com', password: '123456789'})} btnText="Login" className='hover:bg-green-700 duration-500' disabled={false} />
      
      {loading ? <h1 className='text-4xl text-red-600'>Loading</h1> : <h6 className="text-3xl text-white">react-post</h6>}
      <Footer />
    </div>
  )
}

export default App
