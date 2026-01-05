interface Input {
    msg: string
    status: number
    showBox: React.Dispatch<React.SetStateAction<any>>
}
function PopUp({msg, status, showBox}: Input) {
  return (
    <div className={`absolute left-1/2 w-60 -translate-x-1/2 flex px-5 p-2 rounded-md font-medium justify-between ${status === 200 ? "bg-green-600 text-black" : "bg-red-500 text-black"}`}>
        <div className="">{msg}</div>  
        <div className="cursor-pointer text-gray-900"
        onClick={() => showBox((prev: any) => !prev)}
        >X</div>
    </div>
  )
}

export default PopUp