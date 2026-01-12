import axios from "axios"
import { useState } from "react"

export function useSearch(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [searchRes, setSearchRes] = useState([])
    const [loading, setLoading] = useState(false)

    const searchQuery = async (query: string) => {
        try {
            setLoading(true)
            const res = await axios.get(`${BACKEND_URL}/search?searchQuery=${query}`, {withCredentials: true})
            setSearchRes(res.data.blogs)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        searchQuery,
        loading,
        searchRes
    }
}