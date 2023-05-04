import {useEffect,useState,useContext} from 'react'
import './Write.css'
import { Icon } from '@iconify/react';
import axios from 'axios'
import {AuthContext} from '../../context/Context'

const Write = () => {
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [file,setFile] = useState('')
    const {user} = useContext(AuthContext)
    const handleSubmit=async  (e) => {
        e.preventDefault()
        const newPost = {
            username:user.username,
            title,
            description:desc,            

        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name",filename)
            data.append("file",file)
            newPost.image = filename
            
            try{
                await axios.post("/upload/",data)
            }catch(err){
                console.log(err)
            }
        }
            try{
                const res=await axios.post("/posts",newPost)           
                window.location.replace("/post/"+res.data._id)
            }
            catch(err){
                console.log(err)
            }
        
         
        

    }
  return (
    <div className='write'>
        {file&&<img src={URL.createObjectURL(file)} alt="writeImage" className="writeImg" />} 
        <form className="writeForm" onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor='fileInput'>
                    <Icon className='iconAdd' icon="carbon:add-filled"  width="32" height="32" />
                </label>
                <input type='file' id='fileInput' className='inputFileEdit'   onChange={(e)=>setFile(e.target.files[0])}></input>
                <input type='text'placeholder='Title' className='inputTitle' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}></input>
            </div>
            <div className="writeFormGroup">
                <textarea placeholder='Write Something...' type='text' className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)} >

                </textarea>
            </div>
            <button className='writeSubmit' type='submit'>Publish</button>
        </form>
    </div>
  )
}

export default Write