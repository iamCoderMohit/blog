interface Input {
  msg: string;
  status: number;
  showBox: React.Dispatch<React.SetStateAction<any>>;
  reqRes?: any;
}
function PopUp({ msg, status, showBox, reqRes }: Input) {
  return (
    <div
      className={`fixed top-0 left-1/2 w-60 -translate-x-1/2 flex px-5 p-2 rounded-md font-medium justify-between transform transition-transform duration-500 ease-out ${
        status === 200 ? "bg-green-600 text-black" : "bg-red-500 text-black"
      }   ${reqRes ? "translate-y-[150px]" : "-translate-y-[100vh]"}`}
    >
      <div className="">{msg}</div>
      <div
        className="cursor-pointer text-gray-900"
        onClick={() => showBox((prev: any) => !prev)}
      >
        X
      </div>
    </div>
  );
}

export default PopUp;
