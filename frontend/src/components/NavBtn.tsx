import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Inputs {
  isMobile?: boolean;
  setIsMobile?: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBtn({ isMobile, setIsMobile }: Inputs) {
  const { refetchUser, user } = useAuth();


  const navigate = useNavigate();

  function handleClick(path: string) {
    if (isMobile) {
      setIsMobile(false);
    }
    navigate(`${path}`);
  }
  return (
    <div
      className={`
    w-full
    flex gap-10 text-md
    backdrop-blur-2xl py-5
    ${isMobile ? "absolute top-16 left-0 flex-col z-5" : "flex-row"}
  `}
    >
      <button className="cursor-pointer" onClick={() => handleClick("/feed")}>
        Feed
      </button>
      <button
        className="cursor-pointer"
        onClick={() => handleClick("/myblogs")}
      >
        Blogs
      </button>
      {!user && (
        <div className="flex gap-10">
          <button
            className="cursor-pointer"
            onClick={() => handleClick("/signin")}
          >
            Sign in
          </button>
          <button
            className="cursor-pointer"
            onClick={() => handleClick("/signup")}
          >
            Sign up
          </button>
        </div>
      )}
      <button className="cursor-pointer" onClick={() => handleClick("/search")}>
        Search
      </button>
    </div>
  );
}

export default NavBtn;
