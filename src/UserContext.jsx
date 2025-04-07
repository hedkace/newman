import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)

    useEffect(()=>{
        if(!user){
            try {
                axios.get('/getUser').then(({data})=>{
                    setUser(data.userDoc)
                    setReady(true)
                })   
            } catch (error) {
                console.log(error)
                setReady(true)
            }
        }
    },[])

    return (
        <UserContext.Provider value={{user, setUser, ready, setReady}} >
            {children}
        </UserContext.Provider>
    )
}