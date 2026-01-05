import { useEffect } from "react"
import { useBlogs } from "../hooks/useBlog"
import BlogCard from "../components/BlogCard"
import NewBlogMock from "../components/NewBlogMock"
import MainTheme from "../layouts/MainTheme"

function Feed() {
    const {getBlogs, blogs, lastBlog, loading} = useBlogs()
    const bgOpt = ["#fcba03", "#16ab25", "#16ab25", "#182ba8", "#b0259b"]

    useEffect(() => {
        async function fetch() {
            await getBlogs()
        }

        fetch()
    }, [])
  return (
    <MainTheme>
        <h1 className="text-2xl font-bold">Feed</h1>

        <NewBlogMock />

        {loading ? "loading..." : 
        <div className="flex flex-col gap-5 mt-5">
            {blogs.map((i: any) => (
                <BlogCard username={i.author.username} title={i.title} content={i.content} createdAt={i.createdAt} bgColor={bgOpt[Math.floor(Math.random()*bgOpt.length)]} />
            ))}
        </div>
        }

        {blogs ? <button className="bg-blue-600 rounded-md px-3 mx-auto mt-5 cursor-pointer"
        onClick={() => getBlogs(lastBlog)}
        >Load More</button> : null }
    </MainTheme>
  )
}

export default Feed