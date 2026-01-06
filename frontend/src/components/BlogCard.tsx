import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Inputs } from "../commonInputs/interface";
import { hexToRgba } from "../helpers/hextorgb";

function BlogCard({ i, bgColor }: { i: Inputs; bgColor: string }) {
  // username, title, content, createdAt, bgColor, id
  const date = new Date(i.createdAt);
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const navigate = useNavigate();



  const [hover, setHover] = useState(false);

  return (
    <div
      className={`cursor-pointer rounded-md p-3`}
      style={{ backgroundColor: hexToRgba(bgColor, hover ? 0.2 : 0.1) }}
      onClick={() => navigate(`/blog/${i.id}`, { state: {i, bgColor} })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-5 w-5 flex items-center justify-center rounded-full p-4"
          style={{ backgroundColor: bgColor }}
        >
          {i.author.username[0].toUpperCase()}
        </div>
        <h1 className="">{i.author.username}</h1>
      </div>

      <div className="pl-10">
        <h1 className="font-bold text-lg">{i.title}</h1>
        <p>{i.content}</p>
      </div>

      <span>{formatted}</span>
    </div>
  );
}

export default BlogCard;
