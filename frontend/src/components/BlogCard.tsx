import { useNavigate } from "react-router-dom";

interface Inputs {
  username: string;
  title: string;
  content: string;
  createdAt: string;
  bgColor: string;
  id: string
}

//add bg to cards

function BlogCard({ username, title, content, createdAt, bgColor, id }: Inputs) {
    const date = new Date(createdAt)
    const formatted = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })

    const navigate = useNavigate()

    const hexToRgba = (hex: any, alpha: any) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

  return (
    <div className={`cursor-pointer rounded-md p-3`}
    style={{backgroundColor: hexToRgba(bgColor, 0.1)}}
    onClick={() => navigate(`/blog/${id}`)}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-5 w-5 flex items-center justify-center rounded-full p-4"
          style={{ backgroundColor: bgColor }}
        > 
          {username[0].toUpperCase()}
        </div>
        <h1 className="">{username}</h1>
      </div>

      <div className="pl-10">
        <h1 className="font-bold text-lg">{title}</h1>
      <p>{content}</p>
      </div>

      <span>{formatted}</span>
    </div>
  );
}

export default BlogCard;
