import React from 'react'
import './Post.css'
import {Link} from 'react-router-dom'
const Post = ({post}) => {
    const PF = "http://localhost:3500/images/"
  return (
    <div className='post'>
        {<img className='postImag' src={PF+post.image}></img>}
        <div className="postInfo">
            <div className="postCats">
                {post.category.map((c)=>(
                     <div className="postCat">{c} | </div>
                ))}
               
            </div>
            <Link to={`/post/${post ._id}`}>
                <div className="postTitle">
                { post.title}
                </div>
            </Link>
            
            <div className="postDate">{post.createdAt}</div>
        </div>
        <div className="postDescription">
            {post.description}
        </div>
    </div>
  )
}

export default Post