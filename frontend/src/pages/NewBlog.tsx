import { useMemo, useState } from "react";
import MainTheme from "../layouts/MainTheme";
import { useBlogs } from "../hooks/useBlog";
import Spinner from "../components/Spinner";
import PopUp from "../components/PopUp";
import { useNavigate } from "react-router-dom";
import { handleKeyDown } from "../helpers/handleKey";
import { MdDelete } from "react-icons/md";
import Tag from "../components/Tag";

function NewBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleOpt = [
    "VS Code shortcuts you should know....",
    "This language is trending in 2026....",
    "Why JavaScript is harder than it looks....",
    "Hidden Chrome DevTools features....",
    "How I improved coding speed....",
    "Common web dev mistakes....",
    "Frontend vs Backend dilemma....",
    "Why clean code matters....",
    "Top free tools for developers....",
    "How debugging changed me....",
  ];

  const contentPlaceholders = [
    "Start typing here....",
    "Main content goes here....",
    "Write your story here....",
    "Drop your thoughts here....",
    "Explain everything here....",
    "Begin your magic here....",
    "Your content starts here....",
    "Turn ideas into words here....",
    "This is your writing space....",
    "Start creating here....",
  ];

  const titlePlace = useMemo(
    () => titleOpt[Math.floor(Math.random() * titleOpt.length)],
    []
  );
  const blogPlace = useMemo(
    () =>
      contentPlaceholders[
        Math.floor(Math.random() * contentPlaceholders.length)
      ],
    []
  );
  const { postBlog, loading, reqRes, setReqRes } = useBlogs();
  const navigate = useNavigate();
  const [tags, setTags] = useState<String[]>([]);

  async function handleClick() {
    await postBlog(title, content, tags);
    setTitle("");
    setContent("");
    navigate("/myblogs");
  }


  return (
    <MainTheme>
      <PopUp
        msg={reqRes?.msg ?? "something went wrong!!"}
        status={reqRes?.status ?? 500}
        setIsOpen={setReqRes}
        isOpen={reqRes?.isOpen}
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">New blog</h1>
        <div className="h-0.5 bg-blue-700 mt-2 mb-5"></div>

        <h1 className="text-5xl font-bold opacity-20 ">title</h1>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          className="border-b w-full outline-none mt-2 text-2xl font-bold"
          placeholder={titlePlace}
        />

        <h1 className="text-5xl font-bold opacity-20 mt-5">Blog</h1>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name=""
          id=""
          placeholder={blogPlace}
          rows={10}
          className="mt-4 w-full outline-none text-lg"
        ></textarea>

        <h1 className="text-5xl font-bold opacity-20 mt-5">Tags</h1>
        <input
          type="text"
          onKeyDown={(e) => handleKeyDown(e, tags, setTags)}
          className="border-b w-full outline-none mt-2 font-bold"
        />

        <div className="mt-5 flex flex-wrap gap-4">
          {tags.map((i: any, index: number) => (
            <Tag setTags={setTags} name={i} index={index} />
          ))}
        </div>

        <button
          onClick={handleClick}
          className="bg-blue-600 px-4 rounded-md self-end cursor-pointer text-lg py-1"
        >
          {loading ? <Spinner /> : "Post"}
        </button>
      </div>
    </MainTheme>
  );
}

export default NewBlog;
