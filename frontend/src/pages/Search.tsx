import { IoSearch } from "react-icons/io5"
import MainTheme from "../layouts/MainTheme"
import { useSearch } from "../hooks/useSearch"
import { useEffect, useState } from "react"
import { LoaderOne } from "../components/Loader"
import BlogCard from "../components/BlogCard"
import { getRandomColor } from "../helpers/randomColor"
import { useAuth } from "../context/AuthContext"
import AuthComp from "../components/AuthComp"

function Search() {
    const {loading, searchQuery, searchRes} = useSearch()
    const [query, setQuery] = useState("")
    const {user} = useAuth()

    useEffect(() => {
        if(!query) return 

        const debouncedTimer = setTimeout(async () => {
            await searchQuery(query)
        }, 500);

        return () => {
            clearTimeout(debouncedTimer)
        }
    }, [query])

    const [showAuth, setShowAuth] = useState(true)

    if(!user){
        return (
            <AuthComp msg="Sign in to search what you want!!" setShowAuth={setShowAuth} showAuth={showAuth} />
        )
    }

  return (
    <MainTheme>
        <div className="w-full flex border dark:border-white border-black rounded-2xl items-center p-2 text-2xl">
            <input 
            onChange={(e) => setQuery(e.target.value)}
            type="text" className="flex-1 outline-none" placeholder="Search something..." />
            <div className="cursor-pointer"><IoSearch /></div>
        </div>
            <div>
                {loading ? <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"><LoaderOne /></div> : 
                <div className="flex flex-col mt-5 gap-3">
                    {searchRes.map((i) => (
                        <BlogCard bgColor={getRandomColor()} i={i} isEdit={false} />
                    ))}
                </div>
                }
            </div>
    </MainTheme>
  )
}

export default Search