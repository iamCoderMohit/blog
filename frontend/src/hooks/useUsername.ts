import axios from "axios";
import { useState } from "react";

export function useUsername(){
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
    const [usernameErrMsg, setUsernameErrMsg] = useState("")

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

    return {
        checkUsername,
        usernameErrMsg
    }
}