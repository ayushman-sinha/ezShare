import {useState} from 'react';
import './Register.css';
import  background from '../..//assets/register_background.svg'
import axios from 'axios';
const Login = () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [passwordAgain,setPasswordAgain]=useState('')
    const [passEqual,setPassEqual]=useState("")
    const handleSubmit=async (e)=>{
        e.preventDefault();
        checkEqual()
       //console.log(username,email,password,passwordAgain)
       try{
        const res= await axios.post('/auth/register',{username,email,password})
        console.log(res)
        if(res.data){
            window.location.replace('/login')
        }
       }
        catch(err){
              console.log(err)
              alert("User or Email already exists")
        }
       
    }
    const checkEqual=()=>{
        if(email==="" || username==="" || password==="" || passwordAgain===""){
            alert("Please fill all the fields")
        }        
        if(password==passwordAgain){
            setPassEqual("")
        }else{
            setPassEqual("2px solid red")
            alert("Passwords are not equal")
        }
       
    }
    const confirmPass=(e)=>{
       // console.log(password,passwordAgain)
        setPasswordAgain(e.target.value)
       
    }
  return (
    <div className='login'>
         <img className='backgroundEdit' src={background} />
        <form  className="loginForm" onSubmit={handleSubmit}>
            <div className="heading">
                Register
            </div> 
            <div className="registerLogin">
                <div classname="headLabel">
                    Username
                </div>
                <input type='text' placeholder='Enter Username' onChange={(e)=>{ setUsername(e.target.value)}}></input>
            </div>           
            <div className="registerLogin">
                <div classname="headLabel">
                    Email
                </div>
                <input type='email' placeholder='Enter Email' onChange={(e)=>{ setEmail(e.target.value)}}></input>
            </div>
            <div className="registerLogin">
                <div classname="headLabel">
                    Password
                </div>
                <input type='password' placeholder='Enter Password' onChange={(e)=>{setPassword(e.target.value)}}></input>
            </div>
            <div className="registerLogin">
                <div classname="headLabel">
                    Confirm Password
                </div>
                <input type='password' placeholder='Re-enter Password' onChange={(e)=>confirmPass(e)} style={{outline :`${passEqual}`}}></input>
            </div>
            <button className="loginButton" >Register</button>
        </form>
    </div>
  )
}

export default Login