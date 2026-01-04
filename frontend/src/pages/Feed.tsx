import axios from "axios"
import { useState } from "react"

function Feed() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [lastBlog, setLastBlog] = useState<any>("")

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    
    async function getBlogs(cursor?: any) {
        try {
            const res = await axios.get(`${BACKEND_URL}/blog/feed${cursor ? `?cursorVal=${cursor}` : ""}`, {withCredentials: true})
            
            setBlogs((prevBlogs: any) => [...prevBlogs, ...res.data.blogs])
            setLastBlog(res.data.blogs[res.data.blogs.length - 1].id)
            console.log(lastBlog)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <h1>Feed</h1>
        <button onClick={() => getBlogs()}>Get</button>
        {blogs.map((i: any, ind: any) => (
            <div>
                <p>{ind}</p>
                <p>{i.title}</p>
            </div>
        ))}

        <button onClick={() => getBlogs(lastBlog)}>get more</button>
    </div>
  )
}

export default Feed