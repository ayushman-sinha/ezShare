import {useContext,useRef}from 'react';
 import './Login.css';
import {AuthContext} from '../../context/Context';
import  background from '../..//assets/login_background.svg'
import axios from 'axios';
const Login = () => {
    const userRef=useRef();
    const passwordRef=useRef();
    const{user,dispatch,isFetching}=useContext(AuthContext);
    const handleSubmit1 =async (e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        
        try{
            const res=await axios.post("/auth/login",{
                username:userRef.current.value,
                password:passwordRef.current.value,
            });
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        }
        catch(err){
            alert(err.response.data.message);
            dispatch({type:"LOGIN_FAILURE"});
        }
       
    }
    console.log(user);
  return (
    <div className='login'>
        <img className='backgroundEdit' src={background} />
        <form  className="loginForm" onSubmit={handleSubmit1}>
            <div className="heading">
                Login
            </div>            
            <div className="headingLogin">
                <div classname="headLabel">
                    Username
                </div>
                <input type='text' placeholder='Enter Username' ref={userRef}></input>
            </div>
            <div className="headingLogin">
                <div classname="headLabel">
                    Password
                </div>
                <input type='password' placeholder='Enter Password' ref={passwordRef}></input>
            </div>
            <button className="loginButton" type='submit' disabled={isFetching}>Login</button>
        </form>
    </div>
  )
}

export default Login