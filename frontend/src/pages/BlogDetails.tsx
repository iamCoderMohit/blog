import { useLocation, useNavigate } from "react-router-dom";
import MainTheme from "../layouts/MainTheme";
import { hexToRgba } from "../helpers/hextorgb";
import { useBlogs } from "../hooks/useBlog";
import PopUp from "../components/PopUp";
import { useEffect, useState } from "react";
import BottomDialog from "../components/BottomDialog";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function BlogDetails() {
  const blog = useLocation().state;
  const {
    likeBlog,
    reqRes,
    setReqRes,
    isLiked,
    checkLike,
    countLikes,
    likes,
    changeVisibility,
    checkVisibility,
    isPublic,
    deleteBlog,
  } = useBlogs();

  const [openDialog, setOpenDialog] = useState(false);
  const isEdit = blog.isEdit;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      await checkLike(blog.i.id);
      await countLikes(blog.i.id);
      await checkVisibility(blog.i.id);
    }

    fetch();
  }, [isLiked]);

  async function handleLike() {
    await likeBlog(blog.i.id);
  }

  async function handleDelete() {
    await deleteBlog(blog.i.id);
    navigate("/myblogs");
  }

  const [isMobile, setIsMobile] = useState(false)

  return (
    <MainTheme>

<PopUp msg={reqRes?.msg ?? "something went wrong!"} status={reqRes?.status ?? 500} isOpen={reqRes?.isOpen} setIsOpen={setReqRes} />

      <div
        style={{ backgroundColor: hexToRgba(blog.bgColor, 0.1) }}
        className="h-full p-5 rounded-xl"
      >
        {isEdit && (
          <div className="flex justify-between mb-5 items-center">
            <div className="flex items-center gap-5">
              <h1>Change visibility - </h1>
              <h1>currently {isPublic ? "public" : "private"}</h1>
              <select
                name=""
                id=""
                className="text-white px-2 py-1 rounded-md"
                style={{ backgroundColor: hexToRgba(blog.bgColor, 0.2) }}
                onChange={() => changeVisibility(blog.i.id)}
              >
                <option value="" className="bg-gray-900">
                  {isPublic ? "Public" : "Private"}
                </option>
                <option value="" className="bg-gray-900">
                  {isPublic ? "Private" : "Public"}
                </option>
              </select>
            </div>

            <div className="md:hidden block text-xl cursor-pointer"
            onClick={() => setIsMobile(prev => !prev)}
            >
              <BsThreeDotsVertical />
            </div>

            <div className={`flex md:block rounded-lg ${isMobile ? "flex-col gap-3 absolute right-15 backdrop-blur-2xl p-3" : "hidden"} gap-3`}>
              <div
                className="bg-blue-600 rounded-md px-3 py-1 flex items-center cursor-pointer"
                onClick={handleDelete}
              >
                <MdDelete />
              </div>

              <div
                onClick={() =>
                  navigate(`/blog/edit/${blog.i.id}`, {
                    state: { bgColor: blog.bgColor },
                  })
                }
                className="bg-blue-600 rounded-md px-3 flex items-center cursor-pointer py-1"
              >
                <MdEdit />
              </div>
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold">{blog.i.title}</h1>
        <div className="mt-5 flex items-center gap-3">
          <div className="cursor-pointer flex" onClick={handleLike}>
            {isLiked ? (
              <div className="text-3xl">
                <IoHeartSharp color="red" />
              </div>
            ) : (
              <div className="text-3xl">
                <IoHeartOutline color="" />
              </div>
            )}
          </div>
          {likes && (
            <h1
              className="text-lg cursor-pointer"
              onClick={() => setOpenDialog(true)}
            >
              {likes.length} &gt;
            </h1>
          )}
        </div>
        <p className="text-lg mt-5">{blog.i.content}</p>
      </div>

      <BottomDialog
        persons={likes}
        showBox={setOpenDialog}
        isOpen={openDialog}
      />
    </MainTheme>
  );
}

export default BlogDetails;
