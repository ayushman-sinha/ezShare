import React from 'react'
import './Header.css'
import headPic from '../../poi.jpg'
const Header = () => {
  return (
    <div className='Header'>
      <div className='HeaderTitle'>
        <div className="HeaderTitleSmall">Welcome</div>
        <div className="HeaderTitleLarge" >Back</div>
      </div>
      <div className="HeaderImage">
        <img src={headPic} className='img_edit3'></img> 
      </div>
    </div>
  )
}

export default Header