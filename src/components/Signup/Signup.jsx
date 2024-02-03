import React, { useState, useRef } from 'react'
import { authService } from '../../appwrite/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/slices/authSlice.js'
import { Button, InputField } from '../../components/index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

export const Signup = () => {

    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const createAccount = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {console.log('err', error)
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center w-full mt-12 p-4">
            <div className={`mx-auto w-full max-w-lg dark:bg-gray-900 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight dark:text-gray-100">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60 dark:text-gray-100">
                    Already have an account?&nbsp;
                    <Link
                        to="/"
                        className="text-blue-500 hover:text-blue-800 font-medium text-primary transition-all duration-200"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(createAccount)}>
                <div className='space-y-5'>
                    <InputField
                        label="Full Name: "
                        placeholder="Enter your full name"
                        // ref={nameRef}
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <InputField
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        // ref={emailRef}
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    }
                    )}
                    />
                    <InputField
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                    {...register("password", {
                        required: true,})}
                    />
                    <Button
                        btnText='Signup'
                        className="w-full"
                        onClick={() => { 
                            createAccount({name: nameRef.current.value, email: emailRef.current.value, password: passwordRef.current.value})
                            }}>
                        Create Account
                    </Button>
                </div>
                </form>
            </div>

        </div>
    )
}

