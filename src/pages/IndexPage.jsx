import { useContext, useEffect, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"
import Header from "../Header"

export default function IndexPage(){
    const {user, setUser, ready} = useContext(UserContext)
    // const [redirect, setRedirect] = useState(false)
    const [postList, setPostList] = useState([])

    useEffect(()=>{
        // axios.get('/posts').then(({data})=>
        //     setPostList(data)
        // )
        axios("/posts",{
            method: 'GET',
            withCredentials: true
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




    return (
        <div className="flex flex-col min-h-screen bg-[--deepblue]">
                <Header />

                {/* <div className="flex gap-1">
                    <div className="border grow"></div>
                    <div className="border grow"></div>
                </div> */}

                <section className="flex flex-col text-white mx-auto w-[600px] gap-8 p-1">
                    {postList?.length > 0 && postList.map(post => (
                        <Link to={`/post/${post._id}`} className="border border-[#fff3] rounded-lg shadow shadow-[#fff3] bg-[#136]" key={post._id}>
                            {post.photoPosition === "above" && (
                                <div className="w-full h-[320px] flex">
                                    <img src={post.photos[0].url} className="rounded-t-lg object-cover object-[50%_25%] w-full" />
                                </div>
                            )}
                            <div className="p-4 pb-2">
                                <h1 className="text-4xl pl-2 font-[Geoslablight]">{post.title}</h1>
                                <p className="py-4">{post.body}</p>
                                <p className="text-sm text-gray-400 pt-4 justify-end flex p-2">{new Date(post.createdAt).toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            {post.photoPosition === "below" && (
                                <div className="w-full h-[320px] flex">
                                    <img src={post.photos[0].url} className="rounded-b-lg object-cover object-[50%_25%] w-full" />
                                </div>
                            )}
                        </Link>
                    ))}
                </section>
                <div className="min-h-[50px]"></div>
        </div>
    )
}