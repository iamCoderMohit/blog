import axios from "axios"
import { useState } from "react"

function NewBlog() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    
    async function handleClick(title: string, content: string) {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog/new`, {title, content}, {withCredentials: true})
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h1>New blog</h1>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" onChange={(e) => setContent(e.target.value)} />
        <button onClick={() => handleClick(title, content)}>New Blog</button>
    </div>
  )
}

export default NewBlog      