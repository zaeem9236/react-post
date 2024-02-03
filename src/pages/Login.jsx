import { useEffect, useState } from "react";
import { InputField, Button } from "../components/index";
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../redux/slices/authSlice'
import { authService } from '../appwrite/auth'

import { Login as LoginComponent } from "../components/Login/Login";



const Login = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          setLoading(false)
          dispatch(authLogin(userData))
        }
      })
  }, [])

  return <LoginComponent />
  
};
export default Login;