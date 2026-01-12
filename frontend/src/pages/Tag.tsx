import { useLocation } from "react-router-dom"
import MainTheme from "../layouts/MainTheme"
import { useBlogs } from "../hooks/useBlog"
import { LoaderOne } from "../components/Loader"
import BlogCard from "../components/BlogCard"
import { useEffect } from "react"
import { getRandomColor } from "../helpers/randomColor"

function Tag() {
    const tag = useLocation().state
    const {tagBlog, tagBlogs, loading} = useBlogs()

    useEffect(() => {
        async function fetch(){
            await tagBlog(tag)
        }

        fetch()
    }, [])
    return (
    <MainTheme>
        <h1 className="font-bold text-2xl">Blogs containing #{tag}</h1>

        {loading ? <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"><LoaderOne /></div> : 
        <div className="mt-5 flex flex-col gap-3">
            {tagBlogs.map((i) => (
                <BlogCard bgColor={getRandomColor()} isEdit={false} i={i} />
            ))}
        </div>
        }
    </MainTheme>
  )
}

export default Tag