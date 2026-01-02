import axios from "axios"
import { useState } from "react"

function ShowBlogs() {
    const [blogs, setBlogs] = useState<any>([])
    const [likeCount, setLikeCount] = useState(0)
    const [loading, setLoading] = useState(true)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    async function fetchMyBlogs() {
        try {
            const blogs = await axios.get(`${BACKEND_URL}/blog/myblogs`, {withCredentials: true})

            setBlogs(blogs.data.blogs)

            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteBlog(blogId: string) {
        try {
            const deleteBlog = await axios.delete(`${BACKEND_URL}/blog/delete/${blogId}`, {withCredentials: true})

            console.log("deleted")
        } catch (error) {
            console.error(error)
        }
    }

    async function likeBlog(blogId: string) {
        try {
            const like = await axios.post(`${BACKEND_URL}/blog/like/${blogId}`, {}, {withCredentials: true})

            console.log("liked")
        } catch (error) {
            console.error(error)
        }
    }

    async function getLikes(blogId: string) {
        try {
            const likes = await axios.get(`${BACKEND_URL}/blog/getlikes/${blogId}`, {withCredentials: true})

            setLikeCount(likes.data.likes.length)
        } catch (error) {
            console.error(error)
        }
    }

    async function changeVisibility(blogId:string) {
        try {
            const change = await axios.post(`${BACKEND_URL}/blog/change/${blogId}`, {}, {withCredentials: true})
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <button onClick={fetchMyBlogs}>Fetch Blogs</button>
        {!loading && blogs.map((i: any) => (
            <div>
                <p>{i.title}</p>
                <p>{i.content}</p>
                <button onClick={() => deleteBlog(i.id)}>delete</button>
                <button onClick={async () => {await likeBlog(i.id), await getLikes(i.id)}}>Like {likeCount}</button>
                <select name="" id="" onChange={() => changeVisibility(i.id)}>
                    <option value="private">{i.isPublic ? "public" : "private"}</option>
                    <option value="public">{i.isPublic ? "private" : "public"}</option>
                </select>
            </div>
        ))}
    </div>
  )
}

export default ShowBlogs