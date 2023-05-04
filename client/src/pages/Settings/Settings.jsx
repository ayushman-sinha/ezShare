import {useState,useEffect} from 'react'
import './Settings.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import { useContext } from 'react';
import axios from 'axios';
const Settings = () => {
    const {user}=useContext(AuthContext);
    const [userName,setUserName]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const [file,setFile]=useState(null);
    const [success,setSuccess]=useState(false);
    const handleUpdate=async(e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            alert("Password does not match")
            setSuccess(false)
            return;
        }
        if(password==""){
            alert("Password cannot be empty")
            setSuccess(false)
            return;
        }
        const updatedUser={
            userId:user._id,
            username:userName,
            email:email,
            password:password,
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name",filename)
            data.append("file",file)
            updatedUser.image = filename
            try{
                await axios.post("/upload/",data)
                console.log("Image uploaded")
               
            }catch(err){
                console.log(err)
                setSuccess(false)
            }
        }
        try{
            const res=await axios.put("/users/"+user._id,updatedUser)
            setSuccess(true)
            //window.location.replace("/settings")
        }
        catch(err){
            console.log(err)
            setSuccess(false)
        }

    }
    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <div className="settingsUpdateTitle">Update your Account</div>
                    <div className="settingsDeleteTitle">Delete Your Account</div>
                </div>
                <form className="settingsForm" onSubmit={handleUpdate}>
                    <label >Profile Picture</label>
                    <div className="settingsProfilePic">
                        {file?<img  src={URL.createObjectURL(file)} className='settingsProfileImg' alt='profile pic'></img>:<img src={user.profile_pic} className='settingsProfileImg' alt='profile pic'></img>}
                        <label htmlFor='fileInput'>
                            <Icon className='profileIcon' color ='white' icon="carbon:user-avatar-filled-alt" width="48" height="48" />
                            <input type='file' id='fileInput' className='profilePicAttach' onChange={(e)=>setFile(e.target.files[0])} ></input>
                        </label>
                       
                    </div>
                    <label>Username</label>
                    <input type='text' placeholder={user.username} onChange={(e)=>setUserName(e.target.value)}></input>
                    <label>Email</label>
                    <input type='email' placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}></input>
                    <label>Password</label>
                    <input type='password' placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}></input>
                    <label>Re-enter Password</label>
                    <input type='password' placeholder='Re-enter Password' onChange={(e)=>setConfirmPassword(e.target.value)}></input>
                    <button className='settingsSubmit' type='submit'>Update</button>
                    <div>
                        {success && <span style={{color:'green',display:'flex',textAlign:'center',marginTop:'20px',position:'relative'}}>Profile has been updated</span>} 
                    </div>
                </form>
            </div>
            
            
            <Sidebar></Sidebar>
        </div>
    )
    }

export default Settings