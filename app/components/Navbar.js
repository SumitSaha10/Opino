"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faHouseChimney,
    faUsers,
    faTable,
    faCircleUser
} from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation'
const Navbar = () => {
    const pathname = usePathname();
    return (
        <>
            <header className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0" href='/'>
                        <span className="ml-3 text-xl">Opino</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        {pathname === "/login" || pathname === "/signup" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faHouseChimney} /></a>}
                        {pathname === "/login" || pathname === "/signup" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faUsers} /></a>}
                        {pathname === "/login" || pathname === "/signup" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faTable} /></a>}
                        {pathname === "/login" || pathname === "/signup" ? "" : <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faCircleUser} /></a>}
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar
