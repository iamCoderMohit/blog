import axios from "axios"
import { useState } from "react"

function Feed() {
    const [blogs, setBlogs] = useState<any>([])
    const [lastBlog, setLastBlog] = useState("")

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    async function getBlogs(cursor?: Date) {
        try {
            const res = await axios.get(`${BACKEND_URL}/blog/feed${cursor ? `/cursorVal=${cursor}` : ""}`, {withCredentials: true})

            setBlogs(res.data.blogs)
            setLastBlog(blogs[4].createdAt)
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

        <button onClick={() => getBlogs(Date.parse(lastBlog))}>get more</button>
    </div>
  )
}

export default Feed