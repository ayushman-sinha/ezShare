import React from 'react'
import './Comment.css'

const Comment = (props) => {
  return (
    <div className='containerComment'>
      <div className='comment'></div>
        {props.comment}
    </div>
  )
}

export default Comment