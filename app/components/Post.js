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

const Post = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isShowReadMoreButton, setIsShowReadMoreButton] = React.useState(false)
    const ref = React.useRef(null)

    React.useEffect(() => {
        if (ref.current) {
            setIsShowReadMoreButton(ref.current.scrollHeight !== ref.current.clientHeight)
        }
    }, [])
    return (
        <div className='border-2 border-solid border-dark w-72 sm:w-[440px] m-auto mt-2 flex flex-col justify-center '>
            <div className='flex justify-start gap-4 p-1 items-center border-b-2 w-full'>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='name text-md'>Sumit Saha</div>
            </div>
            <div className='postcaption text-md pl-1' style={isOpen ? null : postDataStyle} ref={ref}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda aperiam consequatur asperiores at voluptatibus, exercitationem dolores culpa corrupti, molestias dolorem, ea iste sed inventore numquam eos in enim odit. Ea impedit repellat recusandae fugit quae cum nisi mollitia, a veniam molestiae neque ratione iste ipsam maxime voluptatibus perspiciatis earum consequatur? Vero hic corrupti ullam dolorem molestias quae, minima magnam quod perspiciatis reiciendis similique in? Adipisci temporibus, quibusdam id incidunt placeat ullam? Placeat vero alias quaerat architecto iusto magni.
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
