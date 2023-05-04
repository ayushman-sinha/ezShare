import React from 'react'
import './NavBar.css'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/Context';
import { useContext } from 'react';
export const NavBar = () => {
  const {user}=useContext(AuthContext);
  const handleLogout=()=>{   
    localStorage.removeItem("user");
    window.location.replace("/login");
  }
  return (    
    <div className='top'>
        <div className='topLeft'>
            <Icon icon="bi:facebook" color="black"  width="32" height="32" />
            <Icon icon="akar-icons:instagram-fill" color="black" width="32" height="32" />
            <Icon icon="akar-icons:twitter-fill" color="black" width="32" height="32" />
        </div>
        <div className='topMiddle'>
            <ul className="topList">
              <li><Link to='/'  className='link'>HOME</Link></li>
              <li><Link to='/' className='link'>ABOUT</Link></li>
              <li><Link to='/' className='link'>CONTACT</Link></li>
              <li><Link to='/write' className='link'>{user?"POST":""}</Link></li>
              <li className='logoutButton' onClick={handleLogout}>{user?"LOGOUT":""}</li>
            </ul>
        </div>
        <div className='topRight'>
          {user? <Link to='/settings'><img className='profilePic' src={user.profile_pic} alt=''></img></Link>:
                 (
                  <ul className='topList navEditRight'>
                    <li ><Link to='/login' className='link'>LOGIN</Link></li>
                    <li><Link to='/register' className='link'>REGISTER</Link></li>                    
                  </ul>
                 )

          }
          <Icon icon="fa:search" color="black" width="22" height="22" />    
        </div>

    </div>
  )
}
