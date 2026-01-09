import axios from "axios";
import { Link } from "react-router-dom";

interface Inputs{
    isMobile?: boolean
}

function NavBtn({isMobile}: Inputs) {
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
  return (
    <div className={`flex ${isMobile ? "flex-col fixed top-15 bg-zinc-900 w-full" : "flex-row"} gap-10 text-md`}>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
      <button>
        <Link to={"/feed"}>Feed</Link>
      </button>
      <button>
        <Link to={"/myblogs"}>Blogs</Link>
      </button>
      <button>
        <Link to={"/signin"}>Sign in</Link>
      </button>
      <button>
        <Link to={"/signup"}>Sign up</Link>
      </button>
      <button onClick={logout} className="cursor-pointer">
        Logout
      </button>
    </div>
  );
}

export default NavBtn;
