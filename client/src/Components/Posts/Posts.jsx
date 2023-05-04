import React from 'react'
import './Posts.css'
import Post from '../Post/Post'
import {Link} from 'react-router-dom'
const Posts = ({posts}) => {
  return (
    <div className='Posts'>
      {posts.map((p) => (
        <Post post={p}></Post>
      ))}
     
    </div>
  )
}

export default Posts