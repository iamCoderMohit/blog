import { Link } from "react-router-dom"

function Navbar() {
  return (
    <div>
        <button><Link to={"/"}>Home</Link></button>
        <button><Link to={"/feed"}>Feed</Link></button>
    </div>
  )
}

export default Navbar