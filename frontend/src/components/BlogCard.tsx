import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Inputs } from "../commonInputs/interface";
import { hexToRgba } from "../helpers/hextorgb";
import Tag from "./Tag";
import { useAuth } from "../context/AuthContext";
import AuthComp from "./AuthComp";
import UserBox from "./UserBox";
import { getRandomColor } from "../helpers/randomColor";
import { calcDate } from "../helpers/date";

function BlogCard({
  i,
  bgColor,
  isEdit,
}: {
  i: Inputs;
  bgColor: string;
  isEdit?: boolean;
}) {
  const formatted = calcDate(i.createdAt)

  const navigate = useNavigate();

  const [hover, setHover] = useState(false);
  const {user} = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if(showAuth){
    return (
        <AuthComp msg="Sign in to read this blog!!" setShowAuth={setShowAuth} showAuth={showAuth} />
    )
  }

  const backgroundColor = useMemo(() => getRandomColor(), [])

  return (
    <div
      className={`cursor-pointer rounded-md p-3`}
      style={{ backgroundColor: hexToRgba(bgColor, hover ? 0.2 : 0.1) }}
      onClick={() => {

          navigate(`/blog/${i.id}`, { state: { i, bgColor, isEdit } })
        
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      <UserBox username={i.author.username} backgroundColor={backgroundColor} />

      <div className="pl-10">
        <h1 className="font-bold text-lg">{i.title}</h1>
        <p>{i.content}</p>
      </div>

      {i.tags && <div className="flex items-center justify-between mt-2 flex-wrap">
        <div className="flex gap-3 flex-wrap">
          {i.tags.map((tag: any) => (
            <Tag name={tag.name} />
          ))}
        </div>
        <span>{formatted}</span>
      </div>}
    </div>
  );
}

export default BlogCard;
