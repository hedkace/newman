import axios from "axios"
import { useContext, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { UserContext } from "../UserContext"

export default function LoginPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {user, setUser} = useContext(UserContext)

    async function LoginUser(e){
        e.preventDefault()
        try {
            const response = await axios.post('/login',{
                email,
                password
            })
            console.log(response.data)
            setUser(response.data.userDoc)
            setRedirect(true)
        } catch (error) {
            console.log(error)
        }
    }

    if(redirect){
        if(user.active){
            return <Navigate to={'/'} />
        }
        else{
            return <Navigate to={'/confirm/email'} />
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-[--deepblue] justify-center items-center">
            <div className="flex flex-col w-[320px]">
                <h1 className="text-white text-3xl text-center py-2">Sign In</h1>
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Email</label>
                <input type="text" className="rounded-md p-1" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Password</label>
                <input type="password" className="rounded-md p-1" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                <button className="bg-gray-300 my-8 rounded-md py-1 hover:bg-[--highlight]" onClick={e=>LoginUser(e)}>Log In</button>
                <Link to="/register" className="text-white">Don't have an account yet?</Link>
                <Link className="text-white py-2">Forgot password?</Link>
            </div>
        </div>
    )
}