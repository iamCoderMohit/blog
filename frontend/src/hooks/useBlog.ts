import axios from "axios";
import { useState } from "react";

interface reqRes {
  msg: string;
  status: number;
}

interface ICursor {
  createdAt: string;
  id: string;
}

export function useBlogs() {
  const [blogs, setBlogs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<ICursor | null>(null);
  const [reqRes, setReqRes] = useState<reqRes | null>(null);
  const [myBlogs, setMyblogs] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const getBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BACKEND_URL}/blog/feed${
          cursor ? `?createdAt=${cursor.createdAt}&id=${cursor.id}` : ""
        }`,
        { withCredentials: true }
      );

      setBlogs(
        cursor
          ? (prevBlogs: any) => [...prevBlogs, ...res.data.blogs]
          : res.data.blogs
      );
      setCursor(res.data.nextCursor);
      setReqRes({ msg: "fetched blogs", status: 200 });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setReqRes({ msg: "can't fetch blogs", status: 500 });
    }
  };

  const postBlog = async (title: string, content: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BACKEND_URL}/blog/new`,
        { title, content },
        { withCredentials: true }
      );
      setReqRes({ msg: "blog posted", status: res.status });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setReqRes({ msg: "can't post blog", status: 500 });
    }
  };

  const getMyBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BACKEND_URL}/blog/myblogs${
          cursor ? `?createdAt=${cursor.createdAt}&id=${cursor.id}` : ""
        }`,
        { withCredentials: true }
      );
      setCursor(res.data.nextCursor);
      setMyblogs(cursor ? (prev: never[]) => [...prev, ...res.data.blogs] as never[] : res.data.blogs);
      setReqRes({ msg: "fetched blogs", status: res.status });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setReqRes({ msg: "can't fetch blogs", status: 500 });
    }
  };

  return {
    getBlogs,
    blogs,
    loading,
    postBlog,
    reqRes,
    setReqRes,
    cursor,
    myBlogs,
    getMyBlogs,
  };
}
