
export const Footer = () => {
    return (

        <footer className=" bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className=" fixed bottom-0 w-full p-4 flex items-center justify-center">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a className="hover:underline">React-post</a>. All Rights Reserved.
                    </span>
            </div>
        </footer>
    )
}
