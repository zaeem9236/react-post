import { useEffect, useState } from 'react'
import { Header, Footer, Button, InputField } from './components/index'
import { useDispatch } from 'react-redux'
import Login from './pages/Login'
function App() {
  
  return (
    <div className={`h-screen w-screen bg-gray-200 dark:bg-gray-900`}>
      <Header />
        <Login />
      <Footer />
    </div>
  )
}

export default App
