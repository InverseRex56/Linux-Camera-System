import React from 'react'
import { useState } from 'react'
import { close, menu } from '../assets';
import { navLinks } from '../constants';
import { currDate, currTime } from '../constants';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    /* Creates and centers the navbar */
    <nav class="w-full flex justify-between items-center navbar">

      {/* Places logo and clock at the top left */}
      <a href={"/camera"}><p className="text-gradient text-[52px] font-semibold">SDC</p></a>
      <span className="ml-5 text-white">{currDate}{", "}{currTime}</span>

      {/*Unordered list that contains the options listed in navLinks. This allows for the navbar to be populated there. This object will be hidden if on mobile devices.*/}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white hover:brightness-75`}>
            {/*Creates the slug to redirect. */}
            <a href={`/${nav.id}`}>
              {nav.title}
            </a>
          </li>
        ))}
      </ul>

      {/*Navbar button for mobile. */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px]"
          object-contain
          /*Changes the icon from closed to open on click. */
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          {/*Vertical list for mobile devices. */}
          <ul className="list-none flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              /*Displays the list of options referencing to the key as the ID. */
              <li key={nav.id} className={`font-poppins font-normal cursor-pointer text-[16px] ${index === navLinks.length - 1 ? 'mr-0' : 'mb-4'} text-white`}>
                <a href={`${nav.id}`}>
                  {nav.title}
                  {/*<a href={`/items/${nav.id}`}>{nav.title}</a>*/}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
