import React from 'react'
import { dbService } from "../../appwrite/db"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, status }) {

  return (
    // <Link to={`/post/${$id}`}>
    //   <div className='w-full bg-gray-100 rounded-xl p-4'>
    //     <div className='w-full justify-center mb-4'>
    //       <img src={dbService.getFilePreview(featuredImage)} alt={title}
    //         className='rounded-xl' />

    //     </div>
    //     <h2
    //       className='text-xl font-bold'
    //     >{title}</h2>
    //   </div>
    // </Link>


    <Link to={`/post/${$id}`}>
      <div className="max-w-sm h-full flex flex-col justify-around  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='flex h-3/5 justify-center p-2'>
          <img className="rounded-lg" src={dbService.getFilePreview(featuredImage)} alt={title} />
        </div>
        <div className="p-5 h-1/4 ">
          <h5 className="mb-2 text-md font-medium tracking-tight text-gray-900 dark:text-white">{`${title.length > 25 ? title.substring(0, 25) + '...' : title}`}</h5>
          <p className='flex items-center'>
            <span className={`w-3 h-3  rounded-full ${status == 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <p>&nbsp;&nbsp;{status}</p>
          </p>
        </div>
      </div>
    </Link>
  )
}


export default PostCard