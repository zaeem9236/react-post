import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.js'
import { Route, createRoutesFromElements, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './main.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import AddPost from './pages/AddPost.jsx'
import AllPosts from './pages/AllPosts.jsx'
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost.jsx'
import { AuthLayout } from './components/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '', element: (
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        )
      },
      {
        path: 'signup', element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: 'login', element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: 'add-post', element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: 'all-posts', element: (
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug", element: (
          <AuthLayout authentication={true}>
            <Post />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug", element: (
          <AuthLayout authentication={true}>
            < EditPost />
          </AuthLayout>
        )
      },
    ]
  },
])



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>,
)
