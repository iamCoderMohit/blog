import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

function BgTheme() {
  return (
    <div className='dark:bg-[#14181f] bg-white min-h-full flex flex-col'>
        <Navbar />
        <div className="flex-1 flex h-full">
            <Outlet />
        </div>
    </div>
  )
}

export default BgTheme