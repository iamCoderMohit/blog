import { useLocation } from "react-router-dom";
import MainTheme from "../layouts/MainTheme";
import { hexToRgba } from "../helpers/hextorgb";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { useBlogs } from "../hooks/useBlog";
import PopUp from "../components/PopUp";
import { useEffect, useState } from "react";
import BottomDialog from "../components/BottomDialog";

function BlogDetails() {
  const blog = useLocation().state;
  const {
    likeBlog,
    reqRes,
    setReqRes,
    isLiked,
    loading,
    checkLike,
    countLikes,
    likes,
  } = useBlogs();

  const [openDialog, setOpenDialog] = useState(false)
  const isEdit = blog.isEdit

  useEffect(() => {
    async function fetch() {
      await checkLike(blog.i.id);
      await countLikes(blog.i.id);
    }

    fetch();
  }, [isLiked]);

  async function handleLike() {
    await likeBlog(blog.i.id);
  }
  return (
    <MainTheme>
      {reqRes ? (
        <PopUp msg={reqRes?.msg} status={reqRes?.status} showBox={setReqRes} />
      ) : null}
      <div
        style={{ backgroundColor: hexToRgba(blog.bgColor, 0.1) }}
        className="h-full p-5 rounded-xl"
      >
        {isEdit && <div className="flex justify-between mb-5">
          <div className="flex items-center">
            <h1>Change visibility - </h1>
            <select name="" id="" className="text-white px-2 py-1 rounded-md"
            style={{backgroundColor: hexToRgba(blog.bgColor, 0.2)}}
            >
              <option value="" className="bg-gray-900">Private</option>
              <option value="" className="bg-gray-900">Public</option>
            </select>
          </div>

          <div className="bg-blue-600 rounded-md px-3 flex items-center cursor-pointer">Edit Blog
          </div>
        </div>  }
        <h1 className="text-3xl font-bold">{blog.i.title}</h1>
        <div className="mt-5 flex items-center gap-3">
          <div className="cursor-pointer flex" onClick={handleLike}>
            {loading ? (
              "loading..."
            ) : isLiked ? (
              <div className="text-3xl">
                <AiOutlineDislike />
              </div>
            ) : (
              <div className="text-3xl">
                <AiOutlineLike />{" "}
              </div>
            )}
          </div>
          {likes && <h1 className="text-lg cursor-pointer"
          onClick={() => setOpenDialog(true)}
          >{likes.length} &gt;</h1>}
        </div>
        <p className="text-lg mt-5">{blog.i.content}</p>
      </div>

      <BottomDialog persons={likes} showBox={setOpenDialog} isOpen={openDialog} />
    </MainTheme>
  );
}

export default BlogDetails;
