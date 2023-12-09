'use client';
import Image from "next/image";
import board from "../../../../../public/board.svg";
import NavigationLayout from '../../../../layout/NavigationLayout';
import { useRouter } from "next/navigation";
import AuthToken from "@/app/AuthToken";
import axios from "axios";
import react, { useEffect, useState } from "react";


const Presensi = () => {
  const token = AuthToken();
  const { push } = useRouter();
  token ? "" : push('/');
  

  const [database, setDatabase] = useState({});
  const [dataStatus, setDataStatus] = useState([]);
  const obj = dataStatus[0];

  

  const submit = async (index) => {
    const idMatkul = Number(localStorage.getItem('matkul_id'));
    const idMahasiswa = Number(localStorage.getItem('id'));
    const minggu = index; 

    setDatabase(prevDatabase => ({
      ...prevDatabase,
      "matkul_id" : idMatkul,
      "mahasiswa_id" : idMahasiswa,
      "minggu" : minggu,
      "status" : 1,
    }));

    console.log(database);

    try {
      const response = await axios.post('http://localhost:8000/api/presensi', database );
      console.log("Absensi berhasil:", response.data.data.status);
      location.reload();
    } catch (error) {
      console.error("Kesalahan saat absen", error);
    }
    // push('/mahasiswa/kelas/presensi');
  }
  
  // router.refresh();
  useEffect(() => {
    const getStatus = async () => {
      const idMahasiswa = localStorage.getItem('id');
      const idMatkul = localStorage.getItem('matkul_id');
      // console.log(idMahasiswa)
      
      try {
        const response = await axios.post('http://localhost:8000/api/get_status', { mahasiswa_id: idMahasiswa , matkul_id : idMatkul});
        setDataStatus(response.data);
      } catch (error) {
        console.error("Kesalahan saat absen", error);
      }
    };
    
    getStatus();
  }, []);
  // console.log(dataStatus);
  // console.log(dataStatus[0])
  const presensi = Array(16).fill(0).map((_, index) => ({
    minggu: `${index+1}`,
    status: obj ? obj[index+1] : 0, 
  }));
  const [isHidden, setIsHidden] = useState(false);
  // console.log(presensi);

  return (
    <>
      <NavigationLayout>

        <div className=" container  m-auto  ">
          <div className="px-[20px] ">
            <div className=" lg:w-[70%] m-auto">
              <h1 className="border-b border-[#4723D9] text-3xl text-[#4723D9] pb-8">
                Presensi
              </h1>

              {/* Presensi */}
              <div className="flex mt-8 flex-col ">
                {presensi.map((item, index) => (
                  <div
                  key={index}
                  className="w-full flex justify-between p-4 rounded-2xl hover:shadow-xl"
                  >
                    <div className="flex ">
                      <Image src={board} alt="board" />
                      <h1 className="pl-6 font-bold text-xl max-md:text-[16px]">Minggu ke - {index + 1}</h1>
                    </div>
                    <button
                      disabled={item.status == 1}
                      className={` ${isHidden ? 'hidden' : ''}  ${item.status == 1 ? 'bg-green-500' : 'hover:bg-blue-400 bg-blue-500' } text-white w-[100px] text-[14px] p-2 rounded-xl`}
                      onClick={() => submit(index+1)}
                    >
                      {item.status == 1 ? 'Presensi Done' : 'Presensi Undone'}
                    </button>
                  </div>
                ))}
              </div>
              {/* <section>
                <button onClick={() => router.refresh() } > CLICKKKKK </button>
              </section> */}
            </div>
          </div>
        </div>
      </NavigationLayout>
    </>
  );
};

export default Presensi;
