'use client'

import Image from "next/image";
import bgImage from "../../../../../public/H1_lg.jpg";
import avatar from '../../../../../public/avatar.svg';
import ForumCard from "@/components/ForumCard";
import NavigationLayout from '../../../../layout/NavigationLayout';
import { useRouter } from "next/navigation";
import AuthToken from "@/app/AuthToken";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Forum = () => {
  const token = AuthToken();
  const { push } = useRouter();
  token ? "" : push('/'); 

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      // Membuat fungsi async
      const matkul_id = localStorage.getItem("matkul_id");
      const data = { matkul_id: matkul_id };
      try {
        const response = await axios.post(
          "http://localhost:8000/api/get_tugas",
          data
        );
        console.log(response.data)
        setData(response.data); // Mengisi state data dengan data dari respons
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <NavigationLayout >
        <div className=" z-[-100] container m-auto  ">
          <div className="  flex justify-center">
            <div className=" w-[90%]" >
              <header
                className="HEADER h-[250px] container card w-[full] mt-6 mx-auto "
                style={{
                  backgroundSize: "1400px",
                  backgroundPosition: "center",
                  backgroundImage: `url(${bgImage.src})`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                <section className="mt-auto p-6 drop-shadow-2xl ">
                  <h1 className="text-white text-[28px]">
                    Interaksi Manusia Dengan Hewan (P999)
                  </h1>      
                  <p className="text-white text-[18px]">
                    [M] Selasa, 13:20–16:00 WIB, C-401
                  </p>
                </section>
              </header>

              <main className=" flex mt-12 px-5">
                <section className="max-md:hidden card">
                  <div className="card w-[200px] bg-base-100 p-4 border">
                    <p className="text-[16px] mb-2">Mendatang</p>
                    <p className="text-[14px]  ">
                      Hore, tidak ada tugas yang perlu segera diselesaikan!
                    </p>
                  </div>
                </section>

                <section className="w-full ml-4">
                  <div className=" flex bg-white h-fit rounded-xl p-3 shadow-lg">
                    <div className="w-[55px] mr-3">
                      <Image src={avatar} alt="avatar"></Image>
                    </div>
                    <input 
                      type="text"
                      placeholder="Umumkan sesuatu di Kelas Anda"
                      className="input w-full text-relative text-wrap"
                    />
                  </div>
                  {data.map((item, index) => (
                    <div key={index} >
                      <ForumCard
                        judul={item.judul_tugas}
                      />
                    </div>
                  ))}
                </section>
              </main>
            </div>
          </div>
        </div>
      </NavigationLayout>
    </>
  );
};

export default Forum;
