import { MdCancel } from "react-icons/md";

interface Input {
  msg: string;
  status: number;
  setIsOpen: React.Dispatch<React.SetStateAction<any>>;
  isOpen?: boolean;
}
function PopUp({ msg, status, setIsOpen, isOpen }: Input) {
  return (
    <div
      className={`fixed top-0 left-1/2 w-60 -translate-x-1/2 flex px-5 p-2 rounded-md font-medium justify-between transform transition-transform duration-500 ease-out ${
        status === 200 ? "bg-green-600 text-black" : "bg-red-500 text-black"
      }   ${isOpen ? "translate-y-12.5" : "-translate-y-[100vh]"}`}
    >
      <div className="">{msg}</div>
      <div
        className="cursor-pointer text-gray-900 text-2xl"
        onClick={(prev) => setIsOpen(!prev)}
      >
        <MdCancel />
      </div>
    </div>
  );
}

export default PopUp;
