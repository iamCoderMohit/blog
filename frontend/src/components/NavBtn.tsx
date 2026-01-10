import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Inputs{
    isMobile?: boolean
    setIsMobile?: React.Dispatch<React.SetStateAction<boolean>>
}

function NavBtn({isMobile, setIsMobile}: Inputs) {
  async function logout() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate()

  function handleClick(path: string){
    navigate(`${path}`)
    setIsMobile(false)
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
      <button>
        <Link to={"/"} onClick={() => handleClick("/")}>Home</Link>
      </button>
      <button>
        <Link to={"/feed"} onClick={() => handleClick("/feed")}>Feed</Link>
      </button>
      <button>
        <Link to={"/myblogs"} onClick={() => handleClick("/myblogs")}>Blogs</Link>
      </button>
      <button>
        <Link to={"/signin"} onClick={() => handleClick("/signin")}>Sign in</Link>
      </button>
      <button>
        <Link to={"/signup"} onClick={() => handleClick("/signup")}>Sign up</Link>
      </button>
      <button onClick={logout} className="cursor-pointer">
        Logout
      </button>
    </div>
  );
}

export default NavBtn;
