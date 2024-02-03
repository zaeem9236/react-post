import { useEffect, useState } from 'react'
import { Header, Footer, Button, InputField } from './components/index'
import { useDispatch } from 'react-redux'
import { Outlet } from "react-router"
import Login from './pages/Login'
function App() {
  
  return (
    <div className={`h-screen w-screen overflow-y-scroll	 bg-gray-900 dark:bg-gray-900`}>
      <Header />
        <Outlet />
      <Footer />
    </div>
  )
}

export default App
