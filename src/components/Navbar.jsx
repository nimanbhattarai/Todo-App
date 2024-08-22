import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-slate-700 text-white py-2">
        <div className="logo">
            <span className="font-bold text-xl mx-10">iTask</span>
        </div>
        <ul className="flex gap-10 mx-10">
            <li className="cursor-pointer hover:font-bold transition-all duration-75">Home</li>
            <li className="cursor-pointer hover:font-bold transition-all duration-75">Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar