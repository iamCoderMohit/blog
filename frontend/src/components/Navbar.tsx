import { FaMoon, FaRegMoon } from "react-icons/fa";
import { IoSunny, IoSunnyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import NavBtn from "./NavBtn";
import { ImCross } from "react-icons/im";
import UserBox from "./UserBox";

function Navbar() {
  const { toggleDark, toggleLight, theme } = useTheme();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="flex justify-around dark:text-white text-black items-center p-5">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-2xl font-bold">OpenBlog</h1>
      </div>

      <div className="md:block hidden">
        <NavBtn />
      </div>

      {isMobile && <NavBtn isMobile={isMobile} setIsMobile={setIsMobile} />}

      <div className="flex gap-8 items-center">
        <button onClick={toggleLight} className="text-2xl cursor-pointer">
          {" "}
          {theme === "light" ? <IoSunny /> : <IoSunnyOutline />}
        </button>
        <button onClick={toggleDark} className="cursor-pointer text-lg">
          {theme === "dark" ? <FaMoon /> : <FaRegMoon />}{" "}
        </button>
        //fix this when logged in
        <div className="flex items-center justify-center">
          <UserBox username="mohit" isTop={true} />
        </div>
      </div>

      <div
        className="md:hidden text-xl cursor-pointer"
        onClick={() => setIsMobile((prev) => !prev)}
      >
        {isMobile ? (
          <div className="text-sm">
            <ImCross />
          </div>
        ) : (
          <GiHamburgerMenu />
        )}
      </div>
    </div>
  );
}

export default Navbar;
