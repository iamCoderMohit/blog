import axios from "axios";
import { useState } from "react";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignin(username: string, password: string) {
    try {
      axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        { username, password },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-1/4 flex flex-col bg-gray-800 rounded-2xl p-5 mb-15 gap-5">
        <h1 className="text-white text-2xl font-bold text-center">Signin</h1>
        <input
        className="border border-white rounded-xl pl-4 text-white p-3 text-lg"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        className="border border-white rounded-xl pl-4 text-white p-3 text-lg"
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
        className="bg-blue-700 p-3 rounded-xl text-white text-lg cursor-pointer"
        onClick={() => handleSignin(username, password)}>Enter</button>
      </div>
    </div>
  );
}

export default Signin;
