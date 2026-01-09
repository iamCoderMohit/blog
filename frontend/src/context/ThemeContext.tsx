import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}: {children: any}) => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    useEffect(() => {
        const root = document.documentElement
        if(theme === "dark"){
            root.classList.add("dark")
        } else{
            root.classList.remove("dark")
        }
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleDark = () => {
        setTheme("dark")
    }

    const toggleLight = () => {
        setTheme("light")
    }

    return (
        <ThemeContext.Provider value={{theme, toggleDark, toggleLight}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)