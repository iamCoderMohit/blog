import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

type User = {
    id: string,
    email: string,
    username: string
}

type AuthContextType = {
    user: User | null
    loading: boolean
    refetchUser: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/me`, {withCredentials: true})

            setUser(res.data.user)
        } catch (error) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading, refetchUser: fetchUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("useAuth must be inside AuthProvider!!")
    return ctx
}