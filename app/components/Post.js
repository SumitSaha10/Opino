"use client"
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faComment,
    faShareFromSquare
} from "@fortawesome/free-solid-svg-icons";

let postDataStyle = {

    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3
}

const Post = ({ post }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isShowReadMoreButton, setIsShowReadMoreButton] = React.useState(false)
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (ref.current) {
            setIsShowReadMoreButton(ref.current.scrollHeight !== ref.current.clientHeight)
        }
    }, [])
    return (
        <div className='border-2 border-solid border-dark w-[440px] max-sm:w-72 m-auto mt-2 flex flex-col justify-center '>
            <div className='flex justify-start gap-4 p-1 items-center border-b-2 w-full'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='name text-md'>{post.user}</div>
                <div className="username text-md text-gray-500">@{post.username}</div>
            </div>
            <div className='postcaption text-md pl-1' style={isOpen ? null : postDataStyle} ref={ref}>
                {post.postData}
            </div>
            {isShowReadMoreButton ?
                <button className='self-end' onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Read Less" : "Read More"}</button> : null
            }
            <div className='postimage mt-1'>
                <img src="https://github.com/shadcn.png" className='pl-4 pr-4 w-full h-70' />
            </div>
            <div className='postimpression w-full flex justify-evenly items-center mt-2 p-1'>
                <FontAwesomeIcon className='text-2xl' icon={faHeart} />
                <FontAwesomeIcon className='text-2xl' icon={faComment} />
                <FontAwesomeIcon className='text-2xl' icon={faShareFromSquare} />
            </div>
        </div>

    )
}

export default Post
