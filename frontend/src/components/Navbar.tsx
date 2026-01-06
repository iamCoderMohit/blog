import axios from "axios"
import { Link } from "react-router-dom"

function Navbar() {
  async function logout() {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {}, {withCredentials: true})
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex justify-around text-white items-center p-5">
      <div>
        <h1 className="text-2xl font-bold">OpenBlog</h1>
      </div>
      <div className="flex gap-10 text-md">
        <button><Link to={"/"}>Home</Link></button>
        <button><Link to={"/feed"}>Feed</Link></button>
        <button><Link to={"/myblogs"}>Blogs</Link></button>
        <button><Link to={"/signin"}>Sign in</Link></button>
        <button><Link to={"/signup"}>Sign up</Link></button>
        <button onClick={logout} className="cursor-pointer">Logout</button>
      </div>
    </div>
  )
}

export default Navbar