import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div className="flex justify-around text-white items-center p-5">
      <div>
        <h1 className="text-2xl font-bold">OpenBlog</h1>
      </div>
      <div className="flex gap-10 text-xl">
        <button><Link to={"/"}>Home</Link></button>
        <button><Link to={"/feed"}>Feed</Link></button>
        <button><Link to={"/signin"}>Sign in</Link></button>
        <button><Link to={"/signup"}>Sign up</Link></button>
      </div>
    </div>
  )
}

export default Navbar