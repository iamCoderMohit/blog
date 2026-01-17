import { useNavigate } from "react-router-dom"
import { hexToRgba } from "../helpers/hextorgb"
import { getRandomColor } from "../helpers/randomColor"

interface Input {
  username: string,
  isTop?: boolean,
  backgroundColor?: string
}

function UserBox({username, isTop, backgroundColor}: Input) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-3 cursor-pointer"
    onClick={(e) => {
      e.stopPropagation()
      navigate(`/profile/${username}`
      )
    }}
    >
        <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center font-bold"
        style={{backgroundColor: backgroundColor}}
        >{username[0].toUpperCase()}</div>
        {!isTop && <h1 className="text-lg">{username}</h1>}
    </div>
  )
}

export default UserBox