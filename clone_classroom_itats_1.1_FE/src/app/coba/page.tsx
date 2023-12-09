"use client";
import React, { useEffect, useState } from "react";
import { FetchData } from "../ApiFetch";

import axios from "axios";
import NavbarForum from "@/components/NavbarForum";
import SidebarManual from "@/components/SidebarManual";

import { motion } from "framer-motion";
import ForumCard from "@/components/ForumCard";

import bgImage from "../../../public/H1_lg.jpg";
import avatar from "../../../public/avatar.svg";
import Image from "next/image";

const Coba = ({ children }) => {
  const [fetchData, setFetchdata] = useState([]);

  useEffect(() => {
    FetchData()
      .then((data) => {
        console.log(data);
        setFetchdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleBar = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div>
      <div>
        {/* {fetchData.map((data, index) => (
          <div key={index} >{data.data.nama}</div>
        ))} */}
        <div className="flex">
          <div className="fixed ">
            {isOpen ? (
              <motion.div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
                className=" "
              >
                <SidebarManual isOpen={isOpen} />
              </motion.div>
            ) : (
              ""
            )}
          </div>
          <NavbarForum isOpen={handleBar} value={isOpen} />
          {/* ${isOpen ? 'w-[80%] ml-auto' : ''} */}
          <div className={`mt-24 w-full ${isOpen ? 'w-[80%] ml-[220px] max-md:ml-[100px]' : ''}`}>
            <div className=" min-h-screen">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coba;
