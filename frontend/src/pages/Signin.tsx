import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {refetchUser} = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSignin(username: string, password: string) {
    try {
      setLoading(true)
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/signin`,
        { username, password },
        { withCredentials: true }
      );

      refetchUser()
      setLoading(false)
      navigate("/feed")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full flex justify-center items-center dark:text-white text-black">
      <div className="md:w-1/4 flex flex-col dark:bg-gray-800 bg-gray-800/30 rounded-2xl p-5 mb-15 gap-5">
        <h1 className="text-2xl font-bold text-center">Signin</h1>
        <input
        className="border border-white rounded-xl pl-4 p-3 text-lg"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        className="border border-white rounded-xl pl- p-3 text-lg"
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button 
        className="bg-blue-700 p-3 rounded-xl text-white text-lg cursor-pointer flex justify-center gap-3 items-center"
        onClick={() => handleSignin(username, password)}>
          <h1>Enter</h1> {loading && <Spinner />}
        </button>
      </div>
    </div>
  );
}

export default Signin;
