"use client"
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import NavbarDosen from "@/components/NavbarDosen";
import SidebarDosen from "@/components/SidebarDosen";


const NavigationDosen: React.FC<{children: ReactNode}> = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleBar = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <>
              <div className="flex">
          <div className="fixed ">
            {isOpen ? (
              <motion.div
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
                className=" "
              >
                <SidebarDosen isOpen={isOpen} />
              </motion.div>
            ) : (
              ""
            )}
          </div>
          <NavbarDosen isOpen={handleBar} value={isOpen} />
          {/* ${isOpen ? 'w-[80%] ml-auto' : ''} */}
          <div className={`mt-24 w-full ${isOpen ? 'w-[80%] ml-[220px] max-md:ml-[100px]' : ''}`}>
            <div className=" min-h-screen">
              {children}
            </div>
          </div>
        </div>
    </>
  );
};

export default NavigationDosen;
