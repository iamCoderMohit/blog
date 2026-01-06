import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import PopUp from "../components/PopUp";
import { useBlogs } from "../hooks/useBlog";
import MainTheme from "../layouts/MainTheme";

function MyBlogs() {
    const {myBlogs, loading, reqRes, setReqRes, getMyBlogs} = useBlogs()

    useEffect(() => {
        async function fetch(){
            await getMyBlogs()
        }

        fetch()
    }, [])

  return (
    <MainTheme>
        edit blog
        {reqRes ? <PopUp msg={reqRes.msg} status={reqRes.status} showBox={setReqRes} /> : null}
        <h1 className="font-bold text-2xl mb-5">My Blogs</h1>
        {loading ? "loading..." : <div className="flex flex-col gap-5">
            {myBlogs.map((i: any) => (
                <BlogCard username={i.author.username} title={i.title} content={i.content} createdAt={i.createdAt} bgColor="#c49206" id={i.id} />
            ))}
        </div> }

        <button className="bg-blue-700 px-4 cursor-pointer rounded-md mt-5"
        onClick={() => getMyBlogs()}
        >Load more</button>
    </MainTheme>
  )
}

export default MyBlogs