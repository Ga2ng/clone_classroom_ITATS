'use client';

import Image from "next/image";
import H2 from "../../public/H2.jpg";
import user from "../../public/user.png";
import clock from "../../public/clock.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FetchData } from "@/app/ApiFetch";

const Card =  ({namaDosen, namaMatkul, kelas, kodeKelas, hari, jam, goto}) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }


  return (
    // {}
    <div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} 
    className="relative  ">
      <section
      className="card bg-base-100 shadow-xl ">
        <figure className="bg-blue-600">
          <Image
            src={H2}
            alt="H2"
            width={600}
          />
        </figure>
        <div className="card-body">
          <h1 className="text-[#6B6B6B]" >{namaDosen}</h1>
          <h2 className="card-title py-6">{namaMatkul}</h2>
          <div className="flex justify-between">
            <h3 className="text-[#0D6EFD] font-bold ">{kelas}</h3>
            <h3 className="text-[#764AF1] font-extrabold " >{kodeKelas}</h3>
          </div>
        </div>
      </section>
      {isHovered && 
        <motion.section
        initial={{ y: 200,opacity: 0 }}
        animate={{y: 0, opacity:100 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="card bg-base-100 container w-full shadow-xl absolute  bottom-0 top-0 ">
          <div className="card-body ">
            <h1 className="text-[#6B6B6B]" >{namaDosen}</h1>
            <h2 className="card-title py-2">{namaMatkul}</h2>
            <h3 className="py-2">{hari}, {jam}</h3>
            <nav className=" ">
              <div className="flex gap-2 items-center">
                <div className="w-[18px]">
                  <Image src={user} alt="user_image" style={{ color:'red' }} />
                </div>
                <p>40</p>
              </div>
              <div className=" flex items-center gap-2">
                <div className="w-[18px]">
                  <Image src={clock} alt="clock" />
                </div>
                <p>[M] 02 Jam 30 Menit</p>
              </div>
            <div className="flex mt-4 ">
              <Link href={goto}>
                <div className="bg-[#764AF1] rounded-full w-fit p-6 flex ">
                  <div className=" relative left-[5px] w-fit ">
                    <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-8 border-r-0 h-[14px] w-[14px] " ></div>
                  </div>
                </div>
              </Link>
              <h2 className="flex items-center pl-4 font-bold ">Pergi Ke Kelas</h2>
            </div>
            </nav>
          </div>
        </motion.section>
      }

    </div>
  );
};

export default Card;
