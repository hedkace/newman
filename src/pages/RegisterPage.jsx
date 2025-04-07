import { useContext, useEffect, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import axios from 'axios'
import '../App.css'
import { UserContext } from "../UserContext"

export default function RegisternPage(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState(null)
    const [accountType, setAccountType] = useState("")
    const [sad, setSad] = useState(false)
    const [sar, setSar] = useState(false)
    const [sms, setSms] = useState(false)
    const [smd, setSmd] = useState(false)
    const [newman, setNewman] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)

    async function RegisterUser(e){
        e.preventDefault()
        if(firstName.trim().length < 1 || lastName.trim().length < 1){
            console.log("Must enter all required fields")
            return false
        }
        const emailOk = checkEmail()
        if(!emailOk) {
            console.log("Email address missing or invalid.")
            return false
        }
        const passwordCheck = checkPasswords()
        if(passwordCheck.success){
            try {
                const response = await axios.post('/register', {
                    firstName,
                    lastName,
                    email,
                    password,
                    accountType
                })
                console.log(response)
                setUser(response.data.userDoc)
                setRedirect(true)
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        }
        else{
            console.log(passwordCheck.message)
            return false
        }
    }

    function checkEmail(){
        let emailArr = email.split("@")
        if(emailArr.length < 2) return false
        if(!emailArr[1].includes(".")) return false
        return true
    }

    function checkPasswords(){
        if(password !== confirmPassword) return {success: false, message: "Passwords do not match"}
        if(password.length < 8) return {success: false, message: "Password must be at least 8 characters long."}
        let charCount = {
            symbols: 0,
            lowercase: 0,
            uppercase: 0,
            numbers: 0,
            illegal: 0
        }
        for(const char of password){
            if("1234567890".includes(char)) charCount.numbers ++
            else if("abcdefghijklmnopqrstuvwxyz".includes(char)) charCount.lowercase ++
            else if("ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char)) charCount.uppercase ++
            else if("!@#$%^&*()_+-={}[]|,.<>:;".includes(char)) charCount.symbols ++
            else charCount.illegal ++
        }
        if(charCount.illegal.length > 0) return {success: false, message: "Password cannot contain spaces, slashes or quote marks"}
        else if(charCount.uppercase.length == 0 || charCount.lowercase.length == 0 || charCount.numbers.length == 0 || charCount.symbols.length == 0) return {success: false, message: "Password must contain at least one lower case letter, on upper case letter and one number and one symbol."}
        return {success: true, message: "Password is valid"}
    }

    if(redirect){
        return <Navigate to={'/confirm/email'} />
    }
    
    return (
        <div className="flex flex-col min-h-screen bg-[--deepblue] justify-center items-center">
            <div className="flex flex-col w-[320px]">
                <h1 className="text-white text-3xl text-center py-2">Sign Up</h1>
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">First Name*</label>
                <input type="text" className="rounded-md p-1" placeholder="Enter your first name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Last Name*</label>
                <input type="text" className="rounded-md p-1" placeholder="Enter your last name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Email*</label>
                <input type="text" className="rounded-md p-1" placeholder="Enter your email address" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Password*</label>
                <input type="password" className="rounded-md p-1" placeholder="Choose a Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Confirm Password*</label>
                <input type="password" className="rounded-md p-1" placeholder="Choose a Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Cell Number</label>
                <input type="number" className="rounded-md p-1" placeholder="Enter a number to receive text messages" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                <label htmlFor="" className="pt-2 px-2 pb-1 text-white">Account Type*</label>
                <select name="accountType" className="rounded-md p-1" value={accountType} onChange={(e)=>{setAccountType(e.target.value)}} >
                    <option value="parent">Parent</option>
                    <option value="student">Student</option>
                    <option value="alum">Alum</option>
                    <option value="prospectiveParent">Prospective Parent</option>
                    <option value="prospect">Prospective Student</option>
                    <option value="other">Other</option>
                </select>
                {/* {(accountType === "student" || accountType === "prospect") ? (
                    <>
                        <label className="pt-2 px-2 pb-1 text-white">Birthdate</label>
                        <input type="date" className="rounded-md p-1" placeholder="When were you born?" value={classYear} onChange={(e)=>{setClassYear(e.target.value)}} />
                    </>
                ) : ""}
                {(accountType === "alum") ? (
                    <>
                        <label className="pt-2 px-2 pb-1 text-white">Class Year*</label>
                        <input type="date" className="rounded-md p-1" placeholder="What year did you graduate?" value={classYear} onChange={(e)=>{setClassYear(e.target.value)}} />
                    </>
                ) : ""}
                {(accountType === "prospectiveParent" || accountType === "prospect") ? (
                    <>
                        <label className="pt-2 px-2 pb-1 text-white">Current School</label>
                        <input type="text" className="rounded-md p-1" placeholder="What school are at now?" value={currentSchool} onChange={(e)=>{setCurrentSchool(e.target.value)}} />
                    </>
                ) : ""}
                <label className="pt-2 px-2 pb-1 text-white">Schools*</label>
                <div className="pb-2">
                    <input type="checkbox" value="newman" className="mr-2" checked={newman} onChange={e=>setNewman(e.target.checked)} />
                    <label className="text-white">Newman, Sterling</label>
                </div>
                <div className="pb-2">
                    <input type="checkbox" value="sar" className="mr-2" checked={sar} onChange={e=>setSar(e.target.checked)}  />
                    <label className="text-white">St. Andrew, Rock Falls</label>
                </div>
                <div className="pb-2">
                    <input type="checkbox" value="sad" className="mr-2" checked={sad} onChange={e=>setSad(e.target.checked)} />
                    <label className="text-white">St. Anne, Dixon</label>
                </div>
                <div className="pb-2">
                    <input type="checkbox" value="smd" className="mr-2" checked={smd} onChange={e=>setSmd(e.target.checked)}  />
                    <label className="text-white">St. Mary, Dixon</label>
                </div>
                <div className="">
                    <input type="checkbox" value="sms" className="mr-2" checked={sms} onChange={e=>setSms(e.target.checked)} />
                    <label className="text-white">St. Mary's, Sterling</label>
                </div> */}
                <button className="bg-gray-300 my-8 rounded-md py-1 hover:bg-[--highlight]" onClick={RegisterUser}>Create Account</button>
                <Link to="/login" className="text-white">Already have an account?</Link>
            </div>
        </div>
    )
}