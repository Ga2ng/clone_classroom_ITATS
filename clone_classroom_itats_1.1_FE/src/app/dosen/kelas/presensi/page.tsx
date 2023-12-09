'use client'
import NavigationDosen from '@/layout/NavigationDosen'
import React, { use } from 'react'
import Image from "next/image";
import react, { useEffect, useState } from "react";
import BasicTable from '@/layout/TablePresensiDosen';
import axios from 'axios';

const PresensiPageDosen = () => {

  const [statusPresensi, setStatusPresensi] = useState([]);
  const [controlStatus, setControlStatus] = useState(false);
  const obj = statusPresensi[0];

  const presensi = Array(16).fill(0).map((_, index,) => ({
    minggu: index+1,
    status: obj == null ? "" : obj[index+1] ,
  }));

  // console.log(presensi);

  const [openDaftar, setOpenDaftar] = useState(false);
  const [index, setIndex] = useState();
  const handleDaftar = (index) => {
    setOpenDaftar(true);
    setIndex(index);
    console.log(index);

  }

  
  const handlePresensi = async (index) => {
    
    const valueHiddenStatus = (index) => {
      if(obj[index] == 1 ){
        return 0;
      }else{
        return 1;
      }
    }

    setControlStatus(true);
    console.log('nilai awal', obj[index])
    const returnValue = valueHiddenStatus(index);
    console.log('angka return awal yang akan diinput', returnValue)
    console.log("minggu ke - ",index )

    const data = {
      'minggu' : index,
      'matkul_id' : localStorage.getItem('matkul_id'),
      'status' : returnValue, // markkk    
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/status_presensi', data)
      console.log(response.data);
      
    } catch (error) {
      console.log('erorr conkkk', error)
    }

  }
  // console.log(openPresensi);

  useEffect(() => {
    const matkulId = localStorage.getItem('matkul_id');

    const fetchStatus = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/get_hidden_status', {matkul_id : matkulId });
        console.log(response.data)
        setStatusPresensi(response.data)
      } catch (error) {
        console.log('data error' ,error)
      }
    }
    fetchStatus();
    setControlStatus(false);
  }, [controlStatus])


  return (
    <>
      <NavigationDosen>
      <div className=" container  m-auto  ">
          <div className="px-[20px] ">
            <div className=" lg:w-[70%] m-auto">
              <h1 className="border-b border-[#4723D9] text-3xl text-[#4723D9] pb-8">
                Presensi
              </h1>
              {/* Presensi */}
              <div className='mt-10' >

                {presensi.map((item, index) => (
                  <div key={index} className='mb-4 flex justify-between p-2 rounded-2xl hover:shadow-xl' >
                    <div className='flex items-center' >
                      <h1 className='text-center font-bold text-xl' >Minggu ke - {index+1} </h1>
                    </div>
                    <div className='flex gap-2' >
                      {/* {item.status} */}
                      <button onClick={() => handleDaftar(index+1) } className='text-sm bg-blue-500 w-[100px] text-white px-3 py-2 rounded-xl ' > Daftar Mahasiswa </button>
                      <button onClick={() => handlePresensi(index+1) } className={`text-sm ${item.status ? 'bg-red-500' : 'bg-green-500' }  w-[100px] text-white px-3 py-2 rounded-xl `}> {item.status == 1 ? 'Tutup Presensi' : 'Buka Presensi'} </button>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
          {openDaftar && (
            <div className='h-[100vh] left-0 right-0 top-0 z-50 fixed bg-white' >
              <button
                className="ml-6 mt-6 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center text-[35px] focus:outline-none hover:bg-red-400"
                onClick={() => setOpenDaftar(false)}
                >
                &times;
                {/* &#8592; */}
              </button>
              <div className='mt-[-1rem] w-[70%] m-auto shadow-2xl h-[85%]  overflow-scroll'>
                <BasicTable index={index} />
              </div>
            </div>
          )}
        </div>

      </NavigationDosen>
    </>
  )
}

export default PresensiPageDosen