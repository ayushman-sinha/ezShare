import './SinglePost.css'
import { Icon } from '@iconify/react';
import {useLocation} from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/Context';
import { useContext } from 'react';
import Comment from '../Comment/Comment';
import { BiAddToQueue } from 'react-icons/bi';


const SinglePost = () => {
  const PF="http://localhost:3500/images/";
  const {user} = useContext(AuthContext)
  const [post, setPost] = useState([]);
  const location=useLocation().pathname.split('/')[2]
  const[date1,setDate1]=useState('')
  const [comment,setComment]=useState('')
  const [like,setLike]=useState('')
  const [liked,setLiked]=useState(false)


  const updateLike = async () => {
    console.log(post.likes)
    try{
        if(liked)
          setLike(like-1)
        else
          setLike(like+1)
        let sLike=0;
        if(liked)
          sLike=-1
        else
          sLike=1
        setLiked(!liked)
        
        const res=await axios.put("/posts/"+location+"/like",{username:user.username,likes:sLike})
        

      
    }
    catch(err){
      console.log(err)   
  }
}

  

  // To Update
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [updateMode,setUpdateMode] = useState(false)
  
  const addComment= async (e)=>{
       e.preventDefault()
       comment=comment.trim()
       if(comment===""){
          alert("Comment cannot be empty")
          return;
       }
       const newComment={
          username:user.username,
          comment:comment,
          createdAt:new Date().toISOString(),
          id : new Date().getTime()
       }
       
        try{
          const res=await axios.put("/posts/"+location+"/comment",newComment).then
          (res=>{
            console.log(res)
            alert("Comment Added")
            window.location.reload()
          })

         
        }
        catch(err){
          console.log(err)
        }
  }



  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${location}`)

      setPost(res.data)
      //console.log(res.data)
      setLike(res.data.likes)
      setDate1(new Date(res.data.createdAt).toDateString())
    }
    fetchPost()
  }, [location])
  const handleDelete = async () => {
    if(window.confirm("Are you sure you want to delete this post?")){
      try {
        await axios.delete(`/posts/${location}`, { data: { username: user.username } })
        window.location.replace("/")
      } catch (err) {
        console.log(err)
      }
    }        
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${location}`, { username: user.username, title:title, description:desc })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className='singlepost'>
        <div className="singlePostWrapper">
            <img className='postImag' src={PF+post.image}></img>
            {updateMode?<input type='text'placeholder='Title' className='updateTitle' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}></input>:   <div className='singlePostTitle'>
              {post.title}
              {user&&user.username===post.username?<div className="singlePostEdit">
                <Icon className='singlePostIcon' color='teal' icon="akar-icons:edit" width="32" height="32" onClick={(e)=>{setUpdateMode(!updateMode);console.log(updateMode) }} />
                <Icon className='singlePostIcon' color='tomato' icon="fluent:delete-12-regular" width="32" height="32" onClick={(e)=>handleDelete()}  />
              </div>:<></>}

            </div>}
            <div className="singlePostInfo">

              <div className="singlePostAuthor">
                Author : &nbsp;
                <Link to={`/?username=${post.username}`} className='link'>                  
                  {post.username}
                </Link>
              </div>
              <div className="singlePostDate">
                {date1}
              </div>
              <div>
                Likes <button type='button' onClick={updateLike} >Click</button> : {like}
              </div>
            </div>
            {updateMode?<div className="updateFormGroup">
                <textarea placeholder='Write Something...' type='text' className='updateInput updateText' onChange={(e)=>setDesc(e.target.value)} >
                </textarea>
                <div className='updateButton'>
                  <button className='updateSubmit' onClick={(e)=>{handleUpdate();setUpdateMode(!updateMode);}}>Update</button>
                  <button className='updateSubmit' onClick={(e)=>{setUpdateMode(!updateMode)}}>Cancel</button>
                </div>
               
            </div>:<div className="singlePostDescription">
              {post.description}
            </div>}
            <div className='commentContainer'>
              <div className='commentAdd'>
                <input type='text'placeholder='Add a comment' className='inputComment' autoFocus={true} onChange={ (e)=>{setComment(e.target.value)}}></input>
                <button className='commentSubmit' onClick={addComment}> <BiAddToQueue size = {30} /> </button>
              </div>
               {post&&post.comments&&post.comments.map((c)=>{
                return <Comment  comment1={c} key={c._id} />
              })} 
               
            </div>
        </div>
       
        
    </div>
  )
}

export default SinglePost;