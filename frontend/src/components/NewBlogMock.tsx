import { useNavigate } from "react-router-dom"

function NewBlogMock() {
    const navigate = useNavigate()
    const placeholder = ["This new bug takes....", "Prisma 7 is...", "Github update is crazy...", "VS Code shortcuts you...."]
  return (
    <div>
        <div className="h-0.5 bg-blue-700 mt-2"></div>
        <h1 className="text-lg mt-2">Create Blog</h1>
        <div className="flex">
            <input 
            onClick={() => navigate("/new")}
            type="text" className="text-xl mt-2 outline-0 w-full" placeholder={placeholder[Math.floor(Math.random()*placeholder.length)]} />
            <button className="bg-blue-700 px-4 rounded-md cursor-pointer">Post</button>
        </div>
        <div className="h-0.5 bg-blue-700 mt-4"></div>
    </div>
  )
}

export default NewBlogMock