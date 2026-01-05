import axios from "axios";
import { useState } from "react";
import MainTheme from "../layouts/MainTheme";

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
  "How debugging changed me...."
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
  "Start creating here...."
];

  async function handleClick(title: string, content: string) {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blog/new`,
        { title, content },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    
    <MainTheme>
      <div>
        <h1 className="text-2xl font-bold">New blog</h1>
        <div className="h-0.5 bg-blue-700 mt-2 mb-5"></div>
        {/* <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <input type="text" onChange={(e) => setContent(e.target.value)} />
        <button onClick={() => handleClick(title, content)}>New Blog</button> */}

        <h1 className="text-5xl font-bold opacity-20 ">title</h1>
        <input type="text" className="border-b w-full outline-none mt-2 text-2xl font-bold"
        placeholder={titleOpt[Math.floor(Math.random() * titleOpt.length)]}
        />

        <h1 className="text-5xl font-bold opacity-20 mt-5">Blog</h1>
        <textarea name="" id="" placeholder={contentPlaceholders[Math.floor(Math.random()*contentPlaceholders.length)]}
        rows={10}
        className="mt-4 w-full outline-none text-lg"
        ></textarea>
      </div>
    </MainTheme>
  );
}

export default NewBlog;
