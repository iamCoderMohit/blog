import axios from "axios";
import { useState } from "react";

export function useUsername(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [usernameErrMsg, setUsernameErrMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const checkUsername = async (username: string) => {
        try {
        const res = await axios.post(
          `${BACKEND_URL}/auth/check`,
          { username },
          { withCredentials: true }
        );
        setUsernameErrMsg("username available");
      } catch (error) {
        console.error(error);
        setUsernameErrMsg("username already taken");
      }
    }

    const [myinfo, setMyinfo] = useState([])
    const getMyInfo = async (username: string) => {
      try {
        setLoading(true)
        const res = await axios.get(`${BACKEND_URL}/auth/myinfo?username=${username}`, {withCredentials: true})
        setMyinfo(res.data.info)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    return {
        checkUsername,
        usernameErrMsg,
        myinfo,
        getMyInfo,
        loading
    }
}