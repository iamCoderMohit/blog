import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function BgTheme() {
  return (
    <div className='dark:bg-[#14181f] bg-white min-h-screen flex flex-col'>
        <Navbar />
        <div className="flex-1 flex min-h-0">
            <Outlet />
        </div>
    </div>
  )
}

export default BgTheme