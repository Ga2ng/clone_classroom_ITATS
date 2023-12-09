'use client';

import React from "react";
import Image from "next/image";
import itats from "../../public/itats.png";
import hamburger from "../../public/hamburger.svg";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { push } = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleBar = () => {
    setIsOpen(!isOpen);
  }

  const logout = () => {
    localStorage.clear();
    push('/');
  }

  return (
    <>
      <div className="navbar bg-base-100  ">
        <div className="navbar-start ">
          <a className="btn btn-ghost normal-case text-xl w-[135px] h-[135px]">
            <Image src={itats} alt="itats_logo" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 font-bold ">
            <li >
              <a href="/mahasiswa/home" className="hover:text-[#764AF1]">Home</a>
            </li>
            <li>
              <a className="hover:text-[#764AF1]">Profile</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div onClick={() => handleBar()} className=" lg:hidden ">
            <button className="p-4 rounded-lg bg-purple-500 lg:hidden">
              <Image src={hamburger} alt="hamburger" />
            </button>
          </div>
          <a onClick={logout} className="btn hover:text-white max-lg:hidden hover:bg-[#764AF1] font-bold">Logout</a>
        </div>
      </div>
      {isOpen && (
        <motion.div
        initial={{ 
          y : -100,
          opacity: 0
        }}
        animate={{ 
          y: 0,
          opacity : 100 
        }}
        transition={{
          duration: 1.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="bg-[#764AF1] lg:hidden" >
          <Link href="/" >
            <div className="w-full p-4 border-b text-white  ;">Home</div>
          </Link>
          <Link  href="/profile" >
            <div className="w-full p-4 border-b text-white ">Profile</div>
          </Link>
          <button onClick={logout} >
            <div className="w-full p-4 border-b text-white " >Logout</div>
          </button>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
