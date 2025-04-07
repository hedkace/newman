import { useContext, useEffect, useRef, useState } from "react"
import {Link, Navigate} from "react-router-dom"
import { UserContext } from "../UserContext"
import axios from "axios"
import Header from "../Header"

export default function CreatePage(){
    const {user, setUser, ready} = useContext(UserContext)
    const [redirect, setRedirect] = useState(false)
    const [postList, setPostList] = useState([])
    const [positionAbove, setPositionAbove] = useState(true)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")    
    const [photoList, setPhotoList] = useState([])
    const [imageLink, setImageLink] = useState("")



    async function uploadPhotos(e){
        const files = e.target.files
        let data = new FormData()
        for(let file of files){
            data.append('files', file)
        }
        console.log(data)
        const response = await axios.post('/media/upload',data, {
            headers: {
                'Content-type': "multipart/form-data"
            }
        })
        setPhotoList(prev=>[...prev, ...response.data.data])
    }

    async function handleLinkUpload(e){
        try {
            const response = await axios.post('/upload-from-link',{
                path: imageLink
            })
            console.log(response)
            setPhotoList(prev=>[...prev, response.data])
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async function publishPost(){
        const postDetails = {
            authorId: user._id,
            title,
            body,
            photos: photoList,
            photoPosition: positionAbove? "above" : "below",
        }
        const response = await axios.post('/post',postDetails)
        if(response.success){
            alert('post successful')
            return <Navigate to={"/"} />
        }
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
        <div className="flex flex-col min-h-screen bg-[--deepblue]">
            <Header />

            <div className="text-center max-w-[600px] w-full flex flex-col mx-auto p-1">
                <h1 className="text-3xl font-medium text-white">Create New Post</h1>
                <label className="text-2xl text-left mt-6 mb-2 text-white">Title* <span className="text-sm">(Internal use only - does not display)</span></label>
                <input type="text" className="text-xl p-2 rounded-md" placeholder="Enter a title" value={title} onChange={e=>setTitle(e.target.value)} />
                <label className="text-2xl text-left mt-6 mb-2 text-white">Body*</label>
                <input type="text" className="text-xl p-2 rounded-md" placeholder="Type the body of your post." value={body} onChange={e=>setBody(e.target.value)}  />
                <label className="text-2xl text-left mt-6 mb-2 text-white">Photos</label>
                <div className="flex">
                    <input type="text" className="text-md p-2 rounded-l-md grow" placeholder="Paste image url here" value={imageLink} onChange={e=>setImageLink(e.target.value)} />
                    <button className="bg-gray-300 rounded-r-md text-black px-4 hover:bg-[--highlight] border border-l-black border-gray-300 hover:border-[--highlight]" onClick={e=>handleLinkUpload(e)}>+</button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
                    {photoList.length > 0 && photoList.map(photo=> (
                        <img src={photo.url} className="rounded-md" key={photo.public_id}/>
                    ))}
                    <label className="justify-center flex flex-col cursor-pointer border rounded-md w-full h-full items-center min-h-[100px] bg-[#6661] text-sm text-white hover:text-[--highlight] hover:border-[--highlight] hover:bg-[#0df1]">
                        <input type="file" multiple className="hidden" onChange={e=>uploadPhotos(e)}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        <div className="">Upload</div>
                    </label>
                </div>
                <label className="text-2xl text-left mt-6 mb-2 text-white">Display Photo Position</label>
                <div className="flex justify-around">
                    <div className="flex gap-2 text-white hover:text-[--highlight]" onClick={e=>setPositionAbove(true)}>
                        <input type="radio" value="above" checked={positionAbove} onChange={(e)=>{}} />
                        <label className="">Above</label>
                    </div>
                    <div className="flex gap-2 text-white hover:text-[--highlight]" onClick={e=>setPositionAbove(false)}>
                        <input type="radio" value="below" checked={!positionAbove} onChange={(e)=>{}} />
                        <label className="">Below</label>
                    </div>
                </div>
                
                <label className="text-2xl text-left mt-6 mb-2 text-white">Preview</label>
                <div className="border min-h-[10px] rounded-sm">

                </div>



                <button className="text-xl p-2 rounded-md bg-gray-300 text-black mt-16 hover:bg-[--highlight]" onClick={e=>publishPost(e)}>Post</button>
            </div>
        </div>
    )
}