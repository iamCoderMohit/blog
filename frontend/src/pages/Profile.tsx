import { useEffect } from "react";
import MainTheme from "../layouts/MainTheme";
import { useUsername } from "../hooks/useUsername";
import { useParams } from "react-router-dom";
import { LoaderOne } from "../components/Loader";
import { calcDate } from "../helpers/date";
import BlogCard from "../components/BlogCard";
import { getRandomColor } from "../helpers/randomColor";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Profile() {
  const { getMyInfo, myinfo, loading } = useUsername();
  const { username } = useParams();
  const { refetchUser } = useAuth();

  useEffect(() => {
    async function fetch() {
      await getMyInfo(username!);
    }
    fetch();
  }, []);

  async function logout() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      refetchUser();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <LoaderOne />
      </div>
    );
  }

  const userSince = calcDate(myinfo.createdAt);
  return (
    <MainTheme>
      <div className="flex justify-between">
        <div>
          <h1>{myinfo.username}</h1>
          <h1>user since : {userSince} </h1>
        </div>
        <div className="bg-blue-600 px-3 py-1 rounded-md cursor-pointer h-fit"
        onClick={logout}
        >
          logout
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        {myinfo.blogs &&
          myinfo.blogs.map((i: any) => (
            <BlogCard bgColor={getRandomColor()} i={i} isEdit={false} />
          ))}
      </div>
    </MainTheme>
  );
}

export default Profile;
