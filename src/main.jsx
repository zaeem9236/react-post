import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './main.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  // </React.StrictMode>,
)
