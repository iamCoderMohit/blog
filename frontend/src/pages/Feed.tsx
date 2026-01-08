import { useEffect } from "react";
import { useBlogs } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import NewBlogMock from "../components/NewBlogMock";
import MainTheme from "../layouts/MainTheme";
import type { Inputs } from "../commonInputs/interface";
import { LoaderOne } from "../components/Loader";

function Feed() {
  const { getBlogs, blogs, loading, cursor } = useBlogs();
  const bgOpt = ["#fcba03", "#16ab25", "#16ab25", "#182ba8", "#b0259b"];

  useEffect(() => {
    async function fetch() {
      await getBlogs();
    }

    fetch();   
  }, []);
  return (
    <MainTheme>
      <h1 className="text-2xl font-bold">Feed</h1>

      <NewBlogMock />

      {loading && (
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
          <LoaderOne />
        </div>
      )}
      <div className="flex flex-col gap-5 mt-5">
        {blogs.map((i: Inputs) => (
          <BlogCard
            i={i}
            bgColor={bgOpt[Math.floor(Math.random() * bgOpt.length)]}
          />
        ))}
        {blogs.length > 0 && (
          cursor ? <button
            className="bg-blue-600 rounded-md px-3 mx-auto mt-5 cursor-pointer"
            onClick={() => getBlogs()}
          >
            Load More
          </button> : null
        ) }
      </div>
    </MainTheme>
  );
}

export default Feed;
