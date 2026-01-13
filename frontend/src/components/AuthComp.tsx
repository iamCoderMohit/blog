import { Link } from "react-router-dom";
import MainTheme from "../layouts/MainTheme";
import { IoIosHappy } from "react-icons/io";
import { getRandomColor } from "../helpers/randomColor";
import { hexToRgba } from "../helpers/hextorgb";
import { ImCross } from "react-icons/im";

interface Input {
  msg: string;
  setShowAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  showAuth?: boolean;
}

function AuthComp({ msg, setShowAuth, showAuth }: Input) {
  return (
    <MainTheme>
      <div
        className="flex flex-col gap-5 items-center absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 p-5 rounded-md"
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
        <div className="bg-blue-600 rounded-md w-full text-center cursor-pointer">
          <Link to={"/signin"}>Sign in</Link>
        </div>
      </div>
    </MainTheme>
  );
}

export default AuthComp;
