import { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import PopUp from "../components/PopUp";
import { useBlogs } from "../hooks/useBlog";
import MainTheme from "../layouts/MainTheme";
import type { Inputs } from "../commonInputs/interface";
import { LoaderOne } from "../components/Loader";

function MyBlogs() {
  const { myBlogs, loading, reqRes, setReqRes, getMyBlogs } = useBlogs();

  useEffect(() => {
    async function fetch() {
      await getMyBlogs();
    }

    fetch();
  }, []);

  return (
    <MainTheme>
      {reqRes ? (
        <PopUp msg={reqRes.msg} status={reqRes.status} showBox={setReqRes} />
      ) : null}
      <h1 className="font-bold text-2xl mb-5">My Blogs</h1>
      {loading ? (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"><LoaderOne /></div>
      ) : (
        myBlogs.length > 0 ? <div className="flex flex-col gap-5">
          {myBlogs.map((i: Inputs) => (
            <BlogCard i={i} bgColor="#ff00ff" isEdit={true} />
          ))}
          <button
            className="bg-blue-700 px-4 cursor-pointer rounded-md mt-5"
            onClick={() => getMyBlogs()}
          >
            Load more
          </button>
        </div> : <h1>nothing to see here</h1>
      )}
    </MainTheme>
  );
}

export default MyBlogs;
