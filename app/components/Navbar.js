import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faHouseChimney,
    faUsers,
    faTable,
    faCircleUser
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    return (
        <>
            <header className="text-gray-400 bg-gray-900 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                        <span className="ml-3 text-xl">Opino</span>
                    </a>
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <a className="mr-8 text-white text-xl"><FontAwesomeIcon icon={faHouseChimney} /></a>
                        <a className="mr-8 text-white text-xl"><FontAwesomeIcon icon={faUsers} /></a>
                        <a className="mr-8 text-white text-xl"><FontAwesomeIcon icon={faTable} /></a>
                        <a className="mr-8 text-white text-xl cursor-pointer"><FontAwesomeIcon icon={faCircleUser} />SignIn</a>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar
