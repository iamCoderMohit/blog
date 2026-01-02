import { useState } from 'react'
import './App.css'
import axios from 'axios'
import Signin from './components/Signin'
import NewBlog from './components/NewBlog'
import ShowBlogs from './components/ShowBlogs'

function App() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(username: string, email: string, password: string){
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, {
        username, email, password
      }, {withCredentials: true})
    } catch (error) {
      console.log("some error occurred")
    }
  }

  async function handleLogout() {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, {withCredentials: true})
    } catch (error) {
      console.log(error)
    }
  } //some change
  return (
    <>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleSubmit(username, email, password)}>Enter</button>

      <button onClick={handleLogout}>Logout</button>

      <Signin />

      <NewBlog />

      <ShowBlogs />

      //routing
    </>
  )
}

export default App
