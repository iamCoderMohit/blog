import axios from "axios";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import { IoSunny, IoSunnyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import NavBtn from "./NavBtn";

function Navbar() {


  const { toggleDark, toggleLight, theme } = useTheme();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false)

  console.log(isMobile)

  return (
    <div className="flex justify-around dark:text-white text-black items-center p-5">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="text-2xl font-bold">OpenBlog</h1>
      </div>

        <div className="md:block hidden">
          <NavBtn />
        </div>

        {isMobile && 
        <div>
          <NavBtn isMobile={isMobile} />
        </div>
        }

        <div className="flex gap-8">
          <button onClick={toggleLight} className="text-2xl cursor-pointer">
            {" "}
            {theme === "light" ? <IoSunny /> : <IoSunnyOutline />}
          </button>
          <button onClick={toggleDark} className="cursor-pointer text-lg">
            {theme === "dark" ? <FaMoon /> : <FaRegMoon />}{" "}
          </button>
        </div>

      <div className="md:hidden text-xl cursor-pointer"
      onClick={() => setIsMobile(prev => !prev)}
      >
          <GiHamburgerMenu />
      </div>
    </div>
  );
}

export default Navbar;
