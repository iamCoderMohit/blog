import { Link, useNavigate } from "react-router-dom";
import MainTheme from "../layouts/MainTheme";
import { IoIosHappy } from "react-icons/io";
import { getRandomColor } from "../helpers/randomColor";
import { hexToRgba } from "../helpers/hextorgb";
import { ImCross } from "react-icons/im";
import Overlay from "./Overlay";

interface Input {
  msg: string;
  setShowAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  showAuth?: boolean;
}

function AuthComp({ msg, setShowAuth, showAuth }: Input) {
  const navigate = useNavigate()

  if(!showAuth){
    navigate("/signin")
  }
  return (
    <MainTheme>
      <Overlay showOverlay={showAuth} setShowOverlay={setShowAuth} >
        <div
        className="flex flex-col gap-5 items-center fixed top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 p-5 rounded-md md:w-1/2 w-[90%]"
        style={{ backgroundColor: hexToRgba(getRandomColor(), 0.2) }}
      >
        {showAuth && (
          <div
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => setShowAuth(false)}
          >
            <ImCross />
          </div>
        )}
        <h1 className="font-bold text-2xl">{msg}</h1>
        <h1 className="text-4xl text-center">
          <IoIosHappy />
        </h1>
        <div className="bg-blue-600 rounded-md w-full text-center cursor-pointer"
        onClick={() => navigate("/signin")}
        >
          Sign in
        </div>
      </div>
      </Overlay>
    </MainTheme>
  );
}

export default AuthComp;
