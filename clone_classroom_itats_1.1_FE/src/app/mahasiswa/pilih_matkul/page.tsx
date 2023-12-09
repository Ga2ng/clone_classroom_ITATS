"use client";
import React, { useEffect, useState } from "react";
import getDataFromApiMatkul from "@/app/ApiGetDataAllMatkul";
import Image from "next/image";
import H1 from "../../../../public/H1_lg.jpg";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const PilihMatkul = () => {
  // interface MatkulItem {
  //   id: string;
  //   data: {
  //     nama_matkul: string;
  //     jam_pelajaran: string;
  //     hari: string;
  //     kelas: string;
  //     foto_sampul: string;
  //     kode_kelas: string;
  //   };
  // }

  // const [fetchData, setFetchData] = useState<MatkulItem[]>([]);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    getDataFromApiMatkul()
      .then((data) => {
        console.log(data);
        setFetchData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isNotifFalse, setisNotifFalse] = useState(false);
  useEffect(() => {
    if (isNotifFalse) {
      const timer = setTimeout(() => {
        setisNotifFalse(false); // Setelah 2-3 detik, hilangkan notifikasi
      }, 3000); // 2000 milidetik = 2 detik, sesuaikan dengan kebutuhan Anda

      return () => {
        clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
      };
    }
  }, [isNotifFalse]
  );
  const [isNotifTrue, setisNotifTrue] = useState(false);
  useEffect(() => {
    if (isNotifTrue) {
      const timer = setTimeout(() => {
        setisNotifTrue(false); // Setelah 2-3 detik, hilangkan notifikasi
      }, 3000); // 2000 milidetik = 2 detik, sesuaikan dengan kebutuhan Anda

      return () => {
        clearTimeout(timer); // Bersihkan timer jika komponen di-unmount
      };
    }
  }, [isNotifTrue]);



  const handleSubmit = async (id) => {
    // e.prevetDefault();

    const dataID =  {
      mahasiswa_id : localStorage.getItem('id'),
      matkul_id : id,
    }
    console.log(dataID);

    await axios.post('http://127.0.0.1:8000/api/pilih_matkul', dataID)
    .then(response => {
      console.log('matkul berhasil dipilih', response.data)
      setisNotifTrue(!isNotifTrue)
    })
    .catch(error => {
      setisNotifFalse(!isNotifFalse)
      console.error(error)
    })
  }


  return (
    // bg-[#F5F1FF]
    <div className="min-h-screen " >
      <Navbar/>
      <h1 className="flex pl-8 font-bold text-[45px] mb-8" >Pilih Mata Kuliah Anda</h1>
      {isNotifFalse && (
        <motion.div
        initial={{ y: 200,opacity: 0 }}
        animate={{y: 0, opacity:100 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
          className="alert alert-error w-fit ml-8 mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Mata kuliah sudah dipilih, silahkan pilih mata kuliah lain!!</span>
        </motion.div>
      )}

      {isNotifTrue && (
        <motion.div
        initial={{ y: 200,opacity: 0 }}
        animate={{y: 0, opacity:100 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
          className="alert alert-success w-fit ml-8 mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Mata kuliah berhasil dipilih</span>
        </motion.div>
      )}

      <div className="grid grid-cols-5 px-8 py-8 gap-6">
        {fetchData.map((item) => (
          <div key={item.id}
            onClick={() => handleSubmit(item.id)}
            className="card card-compact w-[270px] bg-base-100 shadow-xl hover:scale-105 hover:transition-transform ">
            <figure>
              <Image
              src={H1}
                alt="image"
                // width={100}
                // height={100}
              />
            </figure>
            <div className="card-body  ">
              <h1 className="text-[16px] uppercase" >{item.data.nama_dosen}</h1>
              <h2 className="card-title  ">{item.data.nama_matkul}</h2>
              <div className="flex" >
                <p>{item.data.hari}</p>
                <p className="text-end" >{item.data.jam_pelajaran}</p>
              </div>
              <div className="flex" >
                <p>{item.data.kelas}</p>
                <p className="text-end" >{item.data.kode_kelas}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PilihMatkul;
