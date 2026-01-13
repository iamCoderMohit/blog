import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

interface Inputs{
    isMobile?: boolean
    setIsMobile?: React.Dispatch<React.SetStateAction<boolean>>
}

function NavBtn({isMobile, setIsMobile}: Inputs) {
  const {refetchUser} = useAuth()
  async function logout() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      refetchUser()
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate()

  function handleClick(path: string){
    setIsMobile(false)
    navigate(`${path}`)
  }
  return (
    <div className={`
    w-full
    flex gap-10 text-md
    backdrop-blur-2xl py-5
    ${isMobile
      ? "absolute top-16 left-0 flex-col z-5"
      : "flex-row"}
  `}>
      <button className="cursor-pointer" onClick={() => handleClick("/")}>
        Home
      </button>
      <button className="cursor-pointer" onClick={() => handleClick("/feed")}>
        Feed
      </button>
      <button className="cursor-pointer" onClick={() => handleClick("/myblogs")}>
        Blogs
      </button>
      <button className="cursor-pointer" onClick={() => handleClick("/signin")}>
        Sign in
      </button>
      <button className="cursor-pointer" onClick={() => handleClick("/signup")}>
        Sign up
      </button>
      <button className="cursor-pointer" onClick={() => handleClick("/search")}>
        Search
      </button>
      <button className="cursor-pointer" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default NavBtn;
