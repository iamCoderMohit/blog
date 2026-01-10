export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, tags: Array<String>, setTags: React.Dispatch<React.SetStateAction<String[]>>) => {
    if(e.key === "Enter" || e.key === "," || e.key === " "){
        e.preventDefault()
        if(tags.length === 5) return

        const value = e.target.value.trim().toLowerCase()
        if(!value || tags.includes(value)) return

        setTags([...tags, value])
        e.target.value = ""
    }
}   