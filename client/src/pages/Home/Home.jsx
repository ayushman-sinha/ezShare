import { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import Posts from '../../Components/Posts/Posts'
import Sidebar from '../../Components/Sidebar/Sidebar'
import axios from 'axios'
import { useEffect } from 'react'
import { useLocation } from 'react-router'
const Home = () => {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()
  console.log(search)
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts/'+search)
      setPosts(res.data)
     //console.log(res)
    }
    fetchPosts()
  }, [search])
  return (
    <div>     
      <Header></Header>
      <div className='Home'>
        <Posts posts={posts}></Posts>
        <Sidebar></Sidebar>
      </div>
      
      
    </div>
  )
}

export default Home