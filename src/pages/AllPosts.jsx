import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import { dbService } from "../appwrite/db";
import { Spinner } from '../components/index'
import { useSelector } from "react-redux";


function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)
  const { $id: currentUser } = useSelector((state) => state.authSlice.userData);
  
  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
        console.log('akram', posts)
      }
    })
    setLoader(false)
  }, [])

  return loader ? (<Spinner />) : (
    <div className='w-full py-8'>
      <div className='flex flex-wrap'>
        {posts.map((post, index) => (
          <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPosts