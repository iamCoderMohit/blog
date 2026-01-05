import axios from "axios";
import { useState } from "react";

export function useBlogs() {
    const [blogs, setBlogs] = useState<any>([])
    const [lastBlog, setLastBlog] = useState([])
    const [loading, setLoading] = useState(true)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const getBlogs = async (cursor?: any) => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/blog/feed${cursor ? `?cursorVal=${cursor}` : ""}`,
        { withCredentials: true }
      );

      setBlogs(cursor ? (prevBlogs: any) => [...prevBlogs, ...res.data.blogs] : res.data.blogs);
      setLastBlog(res.data.blogs[res.data.blogs.length - 1].id);
      setLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getBlogs,
    blogs,
    lastBlog,
    loading
  }
}
