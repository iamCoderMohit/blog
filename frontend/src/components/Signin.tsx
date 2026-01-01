import axios from "axios"
import { useState } from "react"

function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSignin(username: string, password: string) {
        try {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, {username, password}, {withCredentials: true})
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
      <div>
        <h1>Signin</h1>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder="pass" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={() => handleSignin(username, password)}>Enter</button>
    </div>
  )
}

export default Signin