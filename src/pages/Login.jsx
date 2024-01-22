import { useEffect, useState } from "react";
import { InputField, Button } from "../components/index";
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../redux/slices/authSlice'
import { authService } from '../appwrite/auth'

import {Login as LoginComponent} from "../components/Login/Login";



const Login = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        setLoading(false)
        dispatch(authLogin(userData))
      })
  }, [])

  return <div>
    {/* <InputField label='Email' placeholder='Enter your email' /> */}
    {/* <InputField label='Password' placeholder='Enter your password' /> */}
    {/* temp button to login */}
    {/* <Button onClick={() => authService.login({ email: 'abc@abc.com', password: '123456789' })} btnText="Login" className='hover:bg-green-700 duration-500' disabled={false} /> */}

    {/* {loading ? <h1 className='text-4xl text-red-600'>Loading</h1> : <h6 className="text-3xl text-white">react-post</h6>} */}
<LoginComponent />

  </div>;
};
export default Login;