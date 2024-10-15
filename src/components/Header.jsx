import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";

const Header = ({ onSelectComponent , handleLogout}) => {
    
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between px-8 py-3 fixed top-0 left-0 w-full z-40">
        <h1 className="text-xl font-bold">MyApp</h1>
        <div className="flex items-center space-x-4">
            <div className='group relative'>
                <FaRegUserCircle  className="w-8 h-8 rounded-full"/>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 py-3 w-36 px-5 bg-slate-100 text-gray-500 rounded md:hidden'>
                        <p className='cursor-pointer hover:text-black'  onClick={() => onSelectComponent('Profile')}>My Profile</p>
                        <p  className='cursor-pointer hover:text-black'  onClick={() => onSelectComponent('Setting')}>Setting</p>
                        <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header