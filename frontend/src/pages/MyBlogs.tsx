import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import PopUp from "../components/PopUp";
import { useBlogs } from "../hooks/useBlog";
import MainTheme from "../layouts/MainTheme";
import type { Inputs } from "../commonInputs/interface";

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
            {myBlogs.map((i: Inputs) => (
                <BlogCard i={i} bgColor="#ff00ff" isEdit={true} />
            ))}
        </div> }

        <button className="bg-blue-700 px-4 cursor-pointer rounded-md mt-5"
        onClick={() => getMyBlogs()}
        >Load more</button>
    </MainTheme>
  )
}

export default MyBlogs