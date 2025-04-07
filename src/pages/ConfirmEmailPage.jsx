import { useContext, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"

export default function ConfirmEmailPage(){
    const [code, setCode] = useState("")
    const {user, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(null)

    async function handleInputChange(e){
        let temp = ""
        for(let char of e.target.value){
            if("1234567890".includes(char)) temp += char
        }
        setCode(temp)
        if(temp.length == 4) sendCode(temp)
        else if(temp.length > 4) temp = temp.substring(0,4)
        setCode(temp)
    }

    async function sendCode(enteredCode){
        console.log(enteredCode)
        try {
            const response = await axios.post('/confirmEmail', {
                userId: user._id,
                email: user.email,
                code: enteredCode
            })
            console.log(response)
            if(response.data.success) {
                console.log('User account activated. Email address confirmed.')
                setUser(response.data.userDoc)
                setRedirect(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function resendCode(e){
        e.preventDefault()
        try {
            await axios.post('/resendConfirmEmail', { userId:user._id, email:user.email })
        } catch (error) {
            console.log(error)
        }
    }


    if(!user){
        return <Navigate to={'/login'} />
    }
    else{
        console.log(user)
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="flex flex-col min-h-screen bg-[--deepblue] justify-center items-center">
            <div className="flex flex-col w-[320px]">
                <h1 className="text-white text-3xl text-center py-2" onClick={e=>console.log(user)}>Confirm Your Email Address</h1>
                <p className="text-white text-left py-4">A validation code was sent to your email. Enter it here. Do not share the code with anyone else. If you do not see the email, check your spam folder. This code will expire in 10 minutes.</p>
                <label htmlFor="" className="pt-2 pb-2 text-white text-center">Enter your validation code</label>
                <input type="string" className="rounded-md p-1 mb-2 text-3xl text-center w-[100px] mx-auto" placeholder="****" value={code} onChange={e=>handleInputChange(e)}/>
                <Link to="/register" className="text-[#7cf] py-4" onClick={resendCode}>Send a new validation code</Link>
                <Link className="text-[#7cf] text-sm">Need help?</Link>
            </div>
        </div>
    )
}