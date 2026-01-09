import { MdCancel } from "react-icons/md";
import MainTheme from "../layouts/MainTheme";
import UserBox from "./UserBox";

interface persons {
  user: {
    id: string;
    username: string;
  };
}

function BottomDialog({
  persons,
  showBox,
  isOpen,
}: {
  persons: persons[];
  showBox: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <MainTheme>
      <div
        className={`fixed h-fit rounded-2xl bottom-0 bg-gray-900/50 left-1/2 -translate-x-1/2 md:w-1/2 w-full p-5 transform  transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <h1 className="text-lg">Liked by</h1>
        <div>
          {persons.map((i: any) => (
            <UserBox username={i.user.username} />
          ))}
        </div>

        <div
          className="absolute top-5 cursor-pointer right-5 text-2xl"
          onClick={() => showBox(false)}
        >
          <MdCancel />
        </div>
      </div>
    </MainTheme>
  );
}

export default BottomDialog;
