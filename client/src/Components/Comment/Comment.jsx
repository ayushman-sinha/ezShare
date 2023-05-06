import {useState} from 'react'
import axios from 'axios'
import './Comment.css'
import { AuthContext } from '../../context/Context';
import { useContext } from 'react';
import {useLocation} from 'react-router-dom'
import './Comment.css'

const Comment = (props) => {
  const {user} = useContext(AuthContext)
  const location=useLocation().pathname.split('/')[2]
  const [comment,setComment]=useState(props.comment1.comment)
  const [updateMode,setUpdateMode]=useState(false)
  const deleteButton = async (e) => {
    e.preventDefault()   
   axios.delete('/posts/'+location+'/comment/'+props.comment1.id,{data:{username:user.username}})
    alert("Comment Deleted")
    window.location.reload()
 }
  const finalUpdate = async () => {
    const updatedComment={
      username:user.username,
      comment:comment,
      createdAt:props.comment1.createdAt,
      id:props.comment1.id
    }
    try{
      const res=await axios.put("/posts/"+location+"/comment/"+props.comment1.id,updatedComment).then
      (res=>{
        console.log(res)
        alert("Comment Updated")
        window.location.reload()
      })
    
    }
    catch(err){
      console.log(err)   
  }
 

 }
 const updateButton1 = (e) => {
  setUpdateMode(!updateMode)
  
}
  return (
    <div className='containerComment'>
      {updateMode ? 
      <div> <input type='text' className='inputComment' value={comment} onChange={(e)=>setComment(e.target.value)}></input>
        <div> 
          <button className='updateComment' onClick={finalUpdate}>Update</button> 
          <button className='cancelComment' onClick={()=>setUpdateMode(false)}>Cancel</button> 
        </div> 
      </div> : 
        <div className='innerContainerComment'>
        <div className='comment'>Comment : {props.comment1.comment}</div>
        <div className='username'>Username : {props.comment1.username}</div>  
        <div className='CreatedAt'>Created at : {new Date(props.comment1.createdAt).toDateString()}</div>
        {props.comment1.username===user.username &&<div>
          <button className='deleteComment' onClick={deleteButton}>Delete</button>
        <button className='updateComment' onClick={updateButton1}>Update</button>
          </div>}
      </div>
        
      }
    </div>
  )
}

export default Comment