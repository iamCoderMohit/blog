interface Inputs {
  username: string;
  title: string;
  content: string;
  createdAt: string;
  bgColor: string;
}

function BlogCard({ username, title, content, createdAt, bgColor }: Inputs) {
    const date = new Date(createdAt)
    const formatted = date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })
  return (
    <div className="cursor-pointer">
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
