import { createContext, useEffect, useState } from "react";
import axios from "../Components/api_resources/axios";

export const UserContext = createContext()

export function UserContextProvider({children}){
    const [username,setUsername] = useState(null)
    const [id,setId] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("/profile", { withCredentials: true });
                console.log(data)
                setId(data.userId)
                setUsername(data.username)
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    
    return(
        <UserContext.Provider value={{
                                    username,setUsername,
                                    setId,id
                                }}>
                                    {children}
        </UserContext.Provider>
    )
}