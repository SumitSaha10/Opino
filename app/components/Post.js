import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faComment,
    faShareFromSquare
} from "@fortawesome/free-solid-svg-icons";
const Post = () => {
    return (
        <div className='border-2 border-solid border-dark w-72 m-auto mt-2 flex flex-col justify-center '>
            <div className='flex justify-start gap-4 p-1 items-center border-b-2 w-full'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='name text-sm'>Sumit Saha</div>
            </div>
            <div className='postcaption text-[12px] pl-1'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod natus maxime quo possimus. Provident ex maxime suscipit fuga voluptas sint! Facilis adipisci inventore odio? Veritatis omnis exercitationem perspiciatis natus non animi dolor!
            </div>
            <div className='postimage mt-1'>
                <img src="https://github.com/shadcn.png" className='pl-4 pr-4 w-full h-48' />
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
