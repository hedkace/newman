import { useContext, useEffect, useRef, useState } from "react"
import {Link, Navigate, useParams} from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"
import Header from "../Header"

export default function PostPage(){
    const {user, setUser, ready} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [post, setPost] = useState(null)
    const {id} = useParams()
    const [back, setBack] = useState(false)


    useEffect(()=>{
        if(!id){
            return
        }
        axios.get(`/post/${id}`).then(response=>{
            setPost(response.data)
        })
    },[])

    if(!ready){
        return ( 
            <div>Loading...</div>
        )
    }
    else if(!user){
        return <Navigate to={'/login'} />
    }
    
    if(back){
        return <Navigate to={"/"} />
    }


    return (
        <div className="flex flex-col min-h-screen bg-[--deepblue]">
            <Header />

            <div className="text-center max-w-[800px] w-full flex flex-col mx-auto p-1">
                <div className="text-white flex hover:text-[--highlight] cursor-pointer" onClick={e=>setBack(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Back
                </div>
                <h1 className="text-3xl font-medium text-white mb-8">{post?.title}</h1>
                <div className="text-white text-gray-300 text-right mb-4">{post? new Date(post?.createdAt).toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ""}</div>
                <div className={post?.photos.length > 1 ? "grid grid-cols-1 md:grid-cols-2 gap-4" : ""}>
                    {post?.photos.length > 0 && post.photos.map(photo=>(
                        <img src={photo.url} className="w-full rounded-lg" key={photo._id} />
                    ))}
                </div>
                <div className="text-white text-left mt-8">{post?.body}</div>
            </div>
        </div>
    )
}