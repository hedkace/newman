import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";


export default function Header(){
    const {user, setUser, ready} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    async function handleLogout(e){
        await axios.post('/logout')
        setUser(null)
        setRedirect(true)
    }
    

    if(!ready){
        return ( 
            <div>Loading...</div>
        )
    }
    else if(!user){
        return <Navigate to={'/login'} />
    }



    return (       
        <header className="flex justify-between text-white items-center px-4 w-full mb-6">
            <div className="flex w-full">
                <div>{user? `Hello, ${user.firstName}` : "Hi"}</div>
            </div>
            <div className="flex -ml-[132px]">
                <Link to={"/"} className="">
                    <div className="size-16 flex">
                        <div className="border-[65px] border-t-[--phillipine] border-[#0038a700] border-r-0"></div>
                        <div className="flex bg-[--phillipine] min-w-full cursor-pointer" to={'/create'}>
                            <img src="src/assets/newman mark white.svg" alt="" className="" />
                        </div>
                        <div className="border-[65px] border-t-[--phillipine] border-[#0038a700] border-l-0"></div>
                    </div>
                </Link>
            </div>
            <div className="flex gap-4 justify-end w-full">
                <div className="cursor-pointer hover:text-[--highlight]" onClick={e=>handleLogout(e)}>logout</div>
                <Link to={'/create'} className="hover:text-[--highlight]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Link>
            </div>
        </header>
    )
    
}