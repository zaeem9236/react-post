import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import { dbService } from "../appwrite/db";
import { Spinner } from '../components/index'

function AllPosts() {
  const [posts, setPosts] = useState([])
  const [loader, setLoader] = useState(true)
  useEffect(() => {
    dbService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
    setLoader(false)
  }, [])

  return loader ? (<Spinner />) : (
    <div className='w-full py-8'>
      <div className='flex flex-wrap'>
        {posts.map((post, index) => (
          <div key={post.$id} className='p-2 w-1/4'>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllPosts