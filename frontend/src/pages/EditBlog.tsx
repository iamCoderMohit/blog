import { useLocation, useParams } from "react-router-dom";
import MainTheme from "../layouts/MainTheme";
import { hexToRgba } from "../helpers/hextorgb";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

function EditBlog() {
  const info = useLocation().state;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetch(id: string) {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/blog/get/${id}`,
        { withCredentials: true }
      );
      setTitle(res.data.blog.title);
      setContent(res.data.blog.content);
      setLoading(false);
    }
    fetch(id!);
  }, []);

  async function update() {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blog/edit/${id}`,
        { title, content },
        { withCredentials: true }
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <MainTheme>
      <div
        className="rounded-xl p-5 "
        style={{ backgroundColor: hexToRgba(info.bgColor, 0.2) }}
      >
        <h1 className="text-2xl font-bold">Edit</h1>

        <div className="flex flex-col mt-5">
          <h1 className="text-2xl font-bold text-gray-500">New Title</h1>
          <input
            type="text"
            className="outline-none border-b text-lg"
            value={loading ? "loading..." : title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h1 className="text-2xl font-bold text-gray-500 mt-5">New Content</h1>
          <textarea
            name=""
            id=""
            className="text-lg outline-none"
            value={loading ? "loading..." : content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-700 rounded-md self-end px-5 mt-3 cursor-pointer"
            onClick={update}
          >
            {loading ? <Spinner /> : "Update"}
          </button>
        </div>
      </div>
    </MainTheme>
  );
}

export default EditBlog;
