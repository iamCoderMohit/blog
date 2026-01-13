import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useEffect } from "react";

function BgTheme() {
  useEffect(() => {
  console.log("🟢 BgTheme mounted");
  return () => console.log("🔴 BgTheme unmounted");
}, []);

  return (
    <div className='dark:bg-[#14181f] bg-white min-h-full flex flex-col transition-colors duration-300'>
        <Navbar />
        <div className="flex-1 flex h-full">
            <Outlet />
        </div>
    </div>
  )
}

export default BgTheme