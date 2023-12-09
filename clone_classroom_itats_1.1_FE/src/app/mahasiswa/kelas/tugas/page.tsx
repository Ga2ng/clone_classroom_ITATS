'use client';
import { CardTugas } from "@/components/CardTugas"; 
import NavigationLayout from '../../../../layout/NavigationLayout';
import AuthToken from "@/app/AuthToken";
import { useRouter } from "next/navigation";
import React,  {useEffect, useState} from "react";
import axios from "axios";

const Tugas = () => {
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
      <NavigationLayout>
        {token && (

          <div className="  container m-auto  ">
            <div className="px-[10px] ">
              <div className="w-[70%] max-md:w-[100%]]  m-auto">
                <h1 className="border-b border-[#4723D9] text-3xl text-[#4723D9] pb-8">
                  Materi & Tugas
                </h1>

                <div className="my-8 justify-center" >
                  {data.map((item, index) => (
                    <div key={index} >
                      <CardTugas
                        index={index + 1}
                        judul={item.judul_tugas}
                        deadline={item.deadline}
                        instruksi={item.instruksi}
                      />
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        )}
      </NavigationLayout>
    </>
  );
};

export default Tugas;
