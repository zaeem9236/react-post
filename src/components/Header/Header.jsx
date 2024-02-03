import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { authService } from "../../appwrite/auth"
import { logout } from "../../redux/slices/authSlice"
import { Logo } from '../index'


export const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedIn = useSelector(state => state?.authSlice?.status)
    const handleLogout = () => {
        authService.logout()
            .then((data) => {
                dispatch(logout())
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const navItems = [
        {
            name: 'Home',
            path: '/',
            active: true
        },
        {
            name: 'Login',
            path: '/login',
            active: !loggedIn
        },
        {
            name: 'Signup',
            path: '/signup',
            active: !loggedIn
        },
        {
            name: "All Posts",
            path: "/all-posts",
            active: loggedIn,
        },
        {
            name: "Add Post",
            path: "/add-post",
            active: loggedIn,
        },
    ]

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to='/' className="flex items-center opacity-80">
                        <Logo  className="h-8 mr-3" alt="Blog Logo" />
                        <span className="self-center text-2xl font-light whitespace-nowrap dark:text-white">React post</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {navItems.map((item) => item.active ? (
                                <li key={item.name}>
                                    <NavLink to={item.path} className={({isActive}) => `block  pl-3 pr-4 ${isActive? 'text-blue-500' : 'text-white hover:text-blue-500'}`} aria-current="page">{item.name}</NavLink>
                                </li>
                            )
                                :
                                null)}

                            {loggedIn &&
                                <li onClick={handleLogout}>
                                    <Link className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-red-300 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0 dark:text-white md:dark:hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</Link>
                                </li>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
