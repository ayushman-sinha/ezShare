import {useEffect,useState} from 'react'
import axios from 'axios';
import { Icon } from '@iconify/react';
import './Sidebar.css'
import {Link} from 'react-router-dom'
const Sidebar = () => {
  const [cats, setCats] = useState([])
  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get('/categories')
      const data = await res.data
      setCats(data)
      //console.log(data)
    }
    fetchCats()
  }, [])
  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <div className="sidebarTitle">
          ABOUT ME 
        </div>
        </div>
      <div className="sidebarItem">        
        <img src="https://fakeimg.pl/350x200/ff0000,128/000,255" alt="sidebarImage"></img>        
      </div>
      <div className="sidebarItem">
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, accusamus veniam suscipit deserunt tenetur aut dolores </p>
      </div>
      <div className="sidebarItem">
        <div className="sidebarTitle">
          CATEGORIES  
        </div>
        <ul className="sidebarList">
          
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className='link' >              
              <li className="sidebarListItem">{c.name}</li>
            
            </Link>
          ))}
        </ul>
      </div>
      <div className="siderbarItem">
        <div className="sidebarTitle">
          FOLLOW US
        </div>
        <div className="sidebarSocial">
          <Icon className='sidebarIcon' icon="bi:facebook" color="black"  width="32" height="32" />
          <Icon className='sidebarIcon' icon="akar-icons:instagram-fill" color="black" width="32" height="32" />
          <Icon className='sidebarIcon' icon="akar-icons:twitter-fill" color="black" width="32" height="32" />
        </div>
      </div>
    </div>
  )
}

export default Sidebar