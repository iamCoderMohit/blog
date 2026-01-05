import axios from "axios";
import { useState } from "react";

interface reqRes {
  msg: string
  status: number
}

export function useBlogs() {
    const [blogs, setBlogs] = useState<any>([])
    const [lastBlog, setLastBlog] = useState([])
    const [loading, setLoading] = useState(false)
    const [reqRes, setReqRes] = useState<reqRes>({msg: "", status: 0})

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const getBlogs = async (cursor?: any) => {
    try {
      setLoading(true)
      const res = await axios.get(
        `${BACKEND_URL}/blog/feed${cursor ? `?cursorVal=${cursor}` : ""}`,
        { withCredentials: true }
      );

      setBlogs(cursor ? (prevBlogs: any) => [...prevBlogs, ...res.data.blogs] : res.data.blogs);
      setLastBlog(res.data.blogs.at(-1)?.createdAt ?? null);
      setReqRes({msg: "fetched blogs", status: 200})
      setLoading(false)
    } catch (error) {
      console.error(error);
      setReqRes({msg: "can't fetch blogs", status: 500})
    }
  };

  const postBlog = async (title: string, content: string) => {
    try {
      setLoading(true)
      const res = await axios.post(`${BACKEND_URL}/blog/new`, {title, content}, {withCredentials: true})
      setReqRes({msg: "blog posted", status: res.status})
      setLoading(false)
    } catch (error) {
      console.error(error)
      setReqRes({msg: "can't post blog", status: 500})
    }
  }

  return {
    getBlogs,
    blogs,
    lastBlog,
    loading,
    postBlog,
    reqRes,
    setReqRes
  }
}
