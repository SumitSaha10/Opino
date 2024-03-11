"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faHouseChimney,
    faUsers,
    faTable,
    faBell
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
const Navbar = () => {
    const pathname = usePathname();
    return (
        <>
            <header className="text-gray-400 bg-orange-400 body-font sticky w-full top-0 z-10">
                <div className="container mx-auto flex flex-wrap p-1 flex-row justify-center">
                    <div className="logos flex justify-around  items-center gap-2 w-full">
                        <a className="flex title-font font-medium mr-2 text-white text-2xl" href='/'>
                            Opino
                        </a>
                        {pathname === "/login" || pathname === "/signup" || pathname === "/forgetpasswordopino" ? "" : <Input type="text" id="text" placeholder="Search Here" className="w-44 outline-none border-none" />}
                    </div>

                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        {pathname === "/login" || pathname === "/signup" || pathname === "/forgetpasswordopino" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faHouseChimney} /></a>}
                        {pathname === "/login" || pathname === "/signup" || pathname === "/forgetpasswordopino" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faUsers} /></a>}
                        {pathname === "/login" || pathname === "/signup" || pathname === "/forgetpasswordopino" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faTable} /></a>}
                        {pathname === "/login" || pathname === "/signup" || pathname === "/forgetpasswordopino" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faBell} /></a>}
                        {pathname === "/login" || pathname === "/signup" || pathname === "/forgetpasswordopino" ? "" : <a className="mr-8 text-white text-xl cursor-pointer">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar></a>}
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar
