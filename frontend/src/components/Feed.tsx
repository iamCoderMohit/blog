import axios from "axios"
import { useState } from "react"

function Feed() {
    const [blogs, setBlogs] = useState<any>([])
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    async function getBlogs() {
        try {
            const res = await axios.get(`${BACKEND_URL}/blog/feed`, {withCredentials: true})

            setBlogs(res.data.blogs)
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <h1>Feed</h1>
        {blogs.map((i: any) => (
            <div>
                <h1>blog</h1>
            </div>
        ))}
    </div>
  )
}

export default Feed